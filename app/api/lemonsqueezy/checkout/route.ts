import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { variantId, planId, credits, userId, userEmail } = await req.json();

    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID || "472095";

    if (!apiKey) {
      return NextResponse.json(
        { error: "LemonSqueezy API Key is not configured." },
        { status: 500 }
      );
    }

    if (!variantId) {
      return NextResponse.json(
        { error: "Product Variant ID is required." },
        { status: 400 }
      );
    }

    const host = req.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    const redirectUrl = `${baseUrl}/pricing?payment_success=true&provider=lemonsqueezy&credits=${credits}&plan=${planId}`;

    const payload = {
      data: {
        type: "checkouts",
        attributes: {
          checkout_options: {
            embed: false,
            media: false,
            logo: true,
          },
          checkout_data: {
            email: userEmail || undefined,
            custom: {
              user_id: userId || "guest",
              plan_id: planId,
              credits: String(credits),
            },
          },
          product_options: {
            redirect_url: redirectUrl,
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: String(storeId),
            },
          },
          variant: {
            data: {
              type: "variants",
              id: String(variantId),
            },
          },
        },
      },
    };

    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/vnd.api+json",
        "Accept": "application/vnd.api+json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("LemonSqueezy Checkout API Error:", result);
      return NextResponse.json(
        { error: result.errors?.[0]?.detail || "Failed to create checkout session." },
        { status: response.status }
      );
    }

    const checkoutUrl = result.data?.attributes?.url;
    return NextResponse.json({ checkoutUrl });
  } catch (error: unknown) {
    console.error("LemonSqueezy Route Error:", error);
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
