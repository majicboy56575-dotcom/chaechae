import { adminDb } from "./firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

const USERS_COLLECTION = "users";

/**
 * Get the current credit balance for a user from Firestore.
 */
export async function getCredits(userId: string): Promise<number> {
  const doc = await adminDb.collection(USERS_COLLECTION).doc(userId).get();
  if (!doc.exists) return 0;
  return doc.data()?.credits ?? 0;
}

/**
 * Add credits to a user's Firestore balance.
 * Uses FieldValue.increment for atomic operation.
 */
export async function addCredits(userId: string, amount: number): Promise<number> {
  const ref = adminDb.collection(USERS_COLLECTION).doc(userId);
  await ref.set(
    { credits: FieldValue.increment(amount), updatedAt: FieldValue.serverTimestamp() },
    { merge: true }
  );
  const updated = await ref.get();
  return updated.data()?.credits ?? amount;
}

/**
 * Deduct credits from a user's Firestore balance (e.g., on refund).
 * Ensures credits never go below 0.
 */
export async function deductCredits(userId: string, amount: number): Promise<number> {
  const ref = adminDb.collection(USERS_COLLECTION).doc(userId);
  const doc = await ref.get();
  const current = doc.exists ? (doc.data()?.credits ?? 0) : 0;
  const newCredits = Math.max(0, current - amount);
  await ref.set(
    { credits: newCredits, updatedAt: FieldValue.serverTimestamp() },
    { merge: true }
  );
  return newCredits;
}

/**
 * Consume 1 credit from a user's Firestore balance.
 * Returns true if successful, false if insufficient credits.
 */
export async function consumeCredit(userId: string): Promise<boolean> {
  const ref = adminDb.collection(USERS_COLLECTION).doc(userId);
  
  return adminDb.runTransaction(async (transaction) => {
    const doc = await transaction.get(ref);
    const current = doc.exists ? (doc.data()?.credits ?? 0) : 0;
    if (current <= 0) return false;
    transaction.set(ref, { credits: current - 1, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    return true;
  });
}
