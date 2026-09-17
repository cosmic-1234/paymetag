import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { accountId } = await request.json();
    return NextResponse.json({
      success: true,
      message: `Account ${accountId} successfully redesignated to NRO Savings under RBI guidelines.`,
      newStatus: "active",
      newType: "NRO Savings",
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to redesignate account" }, { status: 500 });
  }
}
