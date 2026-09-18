import { NextRequest, NextResponse } from "next/server";
import { getCredits } from "../../lib/credits";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const credits = await getCredits(userId);
    return NextResponse.json({ credits });
  } catch (error: unknown) {
    console.error("[Credits API Error]:", error);
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
