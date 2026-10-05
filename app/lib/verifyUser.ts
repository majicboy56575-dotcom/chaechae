import { getAuth } from "firebase-admin/auth";
import { adminApp } from "./firebaseAdmin";

/**
 * Verify the Firebase ID token sent as `Authorization: Bearer <token>`.
 * Returns the authenticated uid, or null if missing/invalid.
 */
export async function getUidFromRequest(req: Request): Promise<string | null> {
  const header = req.headers.get("authorization") || "";
  if (!header.startsWith("Bearer ")) return null;
  const token = header.slice(7).trim();
  if (!token) return null;
  try {
    const decoded = await getAuth(adminApp).verifyIdToken(token);
    return decoded.uid;
  } catch (err) {
    console.warn("[Auth] ID token verification failed:", (err as Error)?.message);
    return null;
  }
}
