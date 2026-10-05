import { adminDb } from "./firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

const USERS_COLLECTION = "users";

// In-memory fallback for local dev when GCP Admin credentials are not present
const localMemoryCredits: Record<string, number> = {};

/**
 * Get the current credit balance for a user from Firestore.
 */
export async function getCredits(userId: string): Promise<number> {
  try {
    const doc = await adminDb.collection(USERS_COLLECTION).doc(userId).get();
    if (!doc.exists) return localMemoryCredits[userId] ?? 0;
    return doc.data()?.credits ?? 0;
  } catch (err) {
    console.warn("[Credits] getCredits fallback to memory/0:", (err as Error)?.message);
    return localMemoryCredits[userId] ?? 0;
  }
}

/**
 * Add credits to a user's Firestore balance.
 * Uses FieldValue.increment for atomic operation.
 */
export async function addCredits(userId: string, amount: number): Promise<number> {
  try {
    const ref = adminDb.collection(USERS_COLLECTION).doc(userId);
    await ref.set(
      { credits: FieldValue.increment(amount), updatedAt: FieldValue.serverTimestamp() },
      { merge: true }
    );
    const updated = await ref.get();
    return updated.data()?.credits ?? amount;
  } catch (err) {
    console.warn("[Credits] addCredits fallback to memory:", (err as Error)?.message);
    const current = localMemoryCredits[userId] ?? 0;
    localMemoryCredits[userId] = current + amount;
    return localMemoryCredits[userId];
  }
}

/**
 * Deduct credits from a user's Firestore balance (e.g., on refund).
 * Ensures credits never go below 0.
 */
export async function deductCredits(userId: string, amount: number): Promise<number> {
  try {
    const ref = adminDb.collection(USERS_COLLECTION).doc(userId);
    const doc = await ref.get();
    const current = doc.exists ? (doc.data()?.credits ?? 0) : 0;
    const newCredits = Math.max(0, current - amount);
    await ref.set(
      { credits: newCredits, updatedAt: FieldValue.serverTimestamp() },
      { merge: true }
    );
    return newCredits;
  } catch (err) {
    console.warn("[Credits] deductCredits fallback to memory:", (err as Error)?.message);
    const current = localMemoryCredits[userId] ?? 0;
    const newCredits = Math.max(0, current - amount);
    localMemoryCredits[userId] = newCredits;
    return newCredits;
  }
}

/**
 * Consume 1 credit from a user's Firestore balance.
 * Returns true if successful, false if insufficient credits.
 */
export async function consumeCredit(userId: string): Promise<boolean> {
  try {
    const ref = adminDb.collection(USERS_COLLECTION).doc(userId);
    
    return await adminDb.runTransaction(async (transaction) => {
      const doc = await transaction.get(ref);
      const current = doc.exists ? (doc.data()?.credits ?? 0) : 0;
      if (current <= 0) return false;
      transaction.set(ref, { credits: current - 1, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
      return true;
    });
  } catch (err) {
    console.warn("[Credits] consumeCredit fallback to memory:", (err as Error)?.message);
    const current = localMemoryCredits[userId] ?? 0;
    if (current <= 0) return false;
    localMemoryCredits[userId] = current - 1;
    return true;
  }
}

// ─── Free Trial (1 watermarked generation per account) ─────────────

export type GenerationKind = "paid" | "trial";

const localTrialUsed: Record<string, boolean> = {};
const localPendingRegen: Record<string, { id: string; watermark: boolean }> = {};

/**
 * Whether the user still has their one-time free (watermarked) trial.
 */
export async function getTrialAvailable(userId: string): Promise<boolean> {
  try {
    const doc = await adminDb.collection(USERS_COLLECTION).doc(userId).get();
    if (!doc.exists) return !localTrialUsed[userId];
    return doc.data()?.trialUsed !== true;
  } catch (err) {
    console.warn("[Credits] getTrialAvailable fallback to memory:", (err as Error)?.message);
    return !localTrialUsed[userId];
  }
}

/**
 * Atomically reserve one generation for the user.
 * Paid credits are used first (clean output). If none, the one-time
 * free trial is used (watermarked output). Returns null if neither.
 */
export async function reserveGeneration(userId: string): Promise<GenerationKind | null> {
  try {
    const ref = adminDb.collection(USERS_COLLECTION).doc(userId);
    return await adminDb.runTransaction(async (tx) => {
      const doc = await tx.get(ref);
      const data = doc.exists ? doc.data() : undefined;
      const credits = data?.credits ?? 0;
      if (credits > 0) {
        tx.set(ref, { credits: credits - 1, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
        return "paid" as const;
      }
      if (data?.trialUsed !== true) {
        tx.set(
          ref,
          { trialUsed: true, trialUsedAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
        return "trial" as const;
      }
      return null;
    });
  } catch (err) {
    console.warn("[Credits] reserveGeneration fallback to memory:", (err as Error)?.message);
    const current = localMemoryCredits[userId] ?? 0;
    if (current > 0) {
      localMemoryCredits[userId] = current - 1;
      return "paid";
    }
    if (!localTrialUsed[userId]) {
      localTrialUsed[userId] = true;
      return "trial";
    }
    return null;
  }
}

/**
 * Give back a reserved generation when the AI call fails.
 */
export async function refundGeneration(userId: string, kind: GenerationKind): Promise<void> {
  if (kind === "paid") {
    await addCredits(userId, 1);
    return;
  }
  try {
    await adminDb.collection(USERS_COLLECTION).doc(userId).set(
      { trialUsed: false, updatedAt: FieldValue.serverTimestamp() },
      { merge: true }
    );
  } catch (err) {
    console.warn("[Credits] refund trial fallback to memory:", (err as Error)?.message);
    localTrialUsed[userId] = false;
  }
}

/**
 * Store a one-time token allowing a single free re-generation of the
 * last result (satisfaction guarantee). Keeps the same watermark mode.
 */
export async function setPendingRegen(userId: string, id: string, watermark: boolean): Promise<void> {
  try {
    await adminDb.collection(USERS_COLLECTION).doc(userId).set(
      { pendingRegen: { id, watermark }, updatedAt: FieldValue.serverTimestamp() },
      { merge: true }
    );
  } catch (err) {
    console.warn("[Credits] setPendingRegen fallback to memory:", (err as Error)?.message);
    localPendingRegen[userId] = { id, watermark };
  }
}

/**
 * Consume the free re-generation token. Returns its watermark mode, or null if invalid.
 */
export async function consumePendingRegen(userId: string, id: string): Promise<{ watermark: boolean } | null> {
  try {
    const ref = adminDb.collection(USERS_COLLECTION).doc(userId);
    return await adminDb.runTransaction(async (tx) => {
      const doc = await tx.get(ref);
      const pending = doc.exists ? doc.data()?.pendingRegen : undefined;
      if (!pending || pending.id !== id) return null;
      tx.set(ref, { pendingRegen: FieldValue.delete() }, { merge: true });
      return { watermark: pending.watermark === true };
    });
  } catch (err) {
    console.warn("[Credits] consumePendingRegen fallback to memory:", (err as Error)?.message);
    const pending = localPendingRegen[userId];
    if (!pending || pending.id !== id) return null;
    delete localPendingRegen[userId];
    return { watermark: pending.watermark };
  }
}
