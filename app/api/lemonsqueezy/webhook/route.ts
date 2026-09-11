import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-signature") || "";
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

    // Verify webhook signature if secret is provided
    if (secret) {
      const hmac = crypto.createHmac("sha256", secret);
      const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
      const signatureBuffer = Buffer.from(signature, "utf8");

      if (
        digest.length !== signatureBuffer.length ||
        !crypto.timingSafeEqual(digest, signatureBuffer)
      ) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta?.event_name;
    const customData = payload.meta?.custom_data;

    console.log(`[LemonSqueezy Webhook] Received event: ${eventName}`, {
      orderId: payload.data?.id,
      customData,
    });

    if (eventName === "order_created") {
      const userId = customData?.user_id;
      const planId = customData?.plan_id;
      const credits = parseInt(customData?.credits || "0", 10);

      console.log(`[LemonSqueezy Webhook] Order created for user: ${userId}, plan: ${planId}, credits: ${credits}`);
      // Credits are also credited upon return to redirect_url on client side.
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error("[LemonSqueezy Webhook Error]:", error);
    const msg = error instanceof Error ? error.message : "Webhook processing failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
