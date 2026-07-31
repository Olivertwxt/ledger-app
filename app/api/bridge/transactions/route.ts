import { NextResponse } from "next/server";
import { getTransactions } from "@/lib/bridge";

// GET /api/bridge/transactions
// Returns the USD -> USDT settlement history.
export async function GET() {
  const transactions = await getTransactions();
  return NextResponse.json(transactions);
}
