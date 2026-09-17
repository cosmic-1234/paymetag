import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, country, password } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      country: country || "USA",
      role: "primary_nri",
      location: country === "UAE" ? "Dubai, UAE" : "San Jose, California, USA",
      pan: "ABCPM1234D",
      aadhaarMasked: "XXXX-XXXX-4521",
      token: `desh_jwt_${Date.now()}_secure_session`,
    };

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      user: newUser,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 500 }
    );
  }
}
