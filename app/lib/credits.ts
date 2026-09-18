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
