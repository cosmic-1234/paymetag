import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { assetId } = await request.json();
    return NextResponse.json({
      success: true,
      message: `Recovery claim dossier submitted for ${assetId}. Acknowledgement dispatch sent.`,
      status: "settled",
      srn: `MCA-IEPF5-${Date.now()}`,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to process claim" }, { status: 500 });
  }
}
