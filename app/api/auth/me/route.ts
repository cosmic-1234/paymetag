import { NextResponse } from "next/server";
import { DEMO_USERS } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({
    user: DEMO_USERS.brijal,
    authenticated: true,
  });
}
