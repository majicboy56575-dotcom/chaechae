import { NextRequest, NextResponse } from "next/server";
import { consumeCredit, getCredits } from "../../../lib/credits";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const success = await consumeCredit(userId);
    if (!success) {
      return NextResponse.json({ error: "Insufficient credits", credits: 0 }, { status: 402 });
    }

    const remaining = await getCredits(userId);
    return NextResponse.json({ success: true, credits: remaining });
  } catch (error: unknown) {
    console.error("[Consume Credit Error]:", error);
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
