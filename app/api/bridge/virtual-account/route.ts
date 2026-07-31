import { NextResponse } from "next/server";
import { getVirtualAccount } from "@/lib/bridge";

// GET /api/bridge/virtual-account
// Returns the account/routing details customers use to pay you in USD.
export async function GET() {
  const account = await getVirtualAccount();
  return NextResponse.json(account);
}
