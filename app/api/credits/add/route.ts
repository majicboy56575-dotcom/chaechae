import { NextRequest, NextResponse } from "next/server";
import { addCredits } from "../../../lib/credits";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { userId, amount } = await req.json();
    if (!userId || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Missing or invalid userId or amount" }, { status: 400 });
    }

    const newBalance = await addCredits(userId, amount);
    return NextResponse.json({ success: true, credits: newBalance });
  } catch (error: unknown) {
    console.error("[Credits Add API Error]:", error);
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
