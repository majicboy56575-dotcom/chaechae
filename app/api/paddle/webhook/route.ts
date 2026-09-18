import { NextResponse } from "next/server";
import { addCredits, deductCredits } from "../../../lib/credits";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const event = JSON.parse(rawBody);

    const eventType = event.event_type;
    console.log(`[Paddle Webhook] Received event: ${eventType}`);

    // ─── Payment Completed: Add credits to Firestore ─────────────────
    if (eventType === "transaction.completed" || eventType === "transaction.paid") {
      const transactionData = event.data;
      const customData = transactionData.custom_data;
      const userId = customData?.userId || customData?.user_id;
      const credits = customData?.credits ? parseInt(customData.credits, 10) : 0;
      const planId = customData?.planId || customData?.plan_id;

      if (userId && credits > 0) {
        const newBalance = await addCredits(userId, credits);
        console.log(`[Paddle Webhook] ✅ Added ${credits} credits for user ${userId}. New balance: ${newBalance} (plan: ${planId})`);
      } else {
        console.warn(`[Paddle Webhook] ⚠️ Missing userId or credits in custom_data`, customData);
      }
    }

    // ─── Refund: Deduct credits from Firestore ─────────────────────
    if (eventType === "transaction.refunded") {
      const transactionData = event.data;
      const customData = transactionData.custom_data;
      const userId = customData?.userId || customData?.user_id;
      const credits = customData?.credits ? parseInt(customData.credits, 10) : 0;
      const planId = customData?.planId || customData?.plan_id;

      if (userId && credits > 0) {
        const newBalance = await deductCredits(userId, credits);
        console.log(`[Paddle Webhook] 🔄 Refund: Deducted ${credits} credits for user ${userId}. New balance: ${newBalance} (plan: ${planId})`);
      } else {
        console.warn(`[Paddle Webhook] ⚠️ Refund event missing userId or credits`, customData);
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: unknown) {
    console.error("[Paddle Webhook Error]:", error);
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
