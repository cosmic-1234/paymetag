import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Demo credentials allow standard login or default to Brijal
    const user = {
      id: "usr_brijal",
      name: "Brijal Patel",
      email: email || "brijal.patel@siliconvalley.io",
      role: "primary_nri",
      location: "San Jose, California, USA",
      pan: "ABCPM1234D",
      aadhaarMasked: "XXXX-XXXX-4521",
      token: `desh_jwt_${Date.now()}_secure_session`,
    };

    return NextResponse.json({
      success: true,
      message: "Authentication successful",
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 500 }
    );
  }
}
