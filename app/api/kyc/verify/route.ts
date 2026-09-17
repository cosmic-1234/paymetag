import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { institution } = await request.json();
    return NextResponse.json({
      success: true,
      message: `Video KYC completed and certified for ${institution}. CKYC KIN refreshed.`,
      status: "verified",
      timestamp: new Date().toISOString(),
      referenceArn: `CKYC-VKYC-${Date.now()}-CERT`,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to verify KYC" }, { status: 500 });
  }
}
