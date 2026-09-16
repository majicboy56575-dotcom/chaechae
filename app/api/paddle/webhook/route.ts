import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const event = JSON.parse(rawBody);

    const eventType = event.event_type;
    console.log(`[Paddle Webhook] Received event: ${eventType}`);

    if (eventType === "transaction.completed" || eventType === "transaction.paid") {
      const transactionData = event.data;
      const customData = transactionData.custom_data;
      const userId = customData?.userId || customData?.user_id;
      const credits = customData?.credits ? parseInt(customData.credits, 10) : 0;
      const planId = customData?.planId || customData?.plan_id;

      console.log(`[Paddle Webhook] Order Success for user ${userId}: +${credits} credits (${planId})`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: unknown) {
    console.error("[Paddle Webhook Error]:", error);
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
