import { NextResponse } from "next/server";
import { DEMO_ACCOUNTS } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({
    accounts: DEMO_ACCOUNTS,
    totalCount: DEMO_ACCOUNTS.length,
  });
}
