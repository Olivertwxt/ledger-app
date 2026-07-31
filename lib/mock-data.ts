// Sample data so every screen looks and works correctly before Bridge.xyz
// access goes live. Shaped to resemble Bridge's real response objects
// (https://apidocs.bridge.xyz) so swapping in real calls later doesn't
// require changing any UI code — only lib/bridge.ts.

export const mockVirtualAccount = {
  id: "va_sample_8k2n",
  status: "active",
  source: {
    currency: "usd",
    bank_name: "Sample Partner Bank",
    account_number: "8842015599",
    routing_number: "084106768",
    account_owner_name: "Your Business Name LLC",
  },
  destination: {
    currency: "usdt",
    payment_rail: "polygon",
    address: "0xPRESET0000000000000000000000000WALLET",
  },
  created_at: "2026-06-01T14:22:00Z",
};

export const mockTransactions = [
  {
    id: "txn_9f2a",
    amount_usd: 4200.0,
    amount_usdt: 4198.32,
    fee_usd: 1.68,
    status: "completed",
    sender_name: "Acme Client Corp",
    created_at: "2026-07-29T09:14:00Z",
  },
  {
    id: "txn_9f21",
    amount_usd: 1500.0,
    amount_usdt: 1499.4,
    fee_usd: 0.6,
    status: "completed",
    sender_name: "J. Alvarez",
    created_at: "2026-07-27T17:02:00Z",
  },
  {
    id: "txn_9e88",
    amount_usd: 800.0,
    amount_usdt: 0,
    fee_usd: 0,
    status: "processing",
    sender_name: "Northgate Wholesale",
    created_at: "2026-07-31T08:45:00Z",
  },
  {
    id: "txn_9e2c",
    amount_usd: 12500.0,
    amount_usdt: 12487.5,
    fee_usd: 12.5,
    status: "completed",
    sender_name: "Acme Client Corp",
    created_at: "2026-07-20T11:30:00Z",
  },
];

export const mockBalance = {
  currency: "usdt",
  available: 18185.22,
  pending: 800.0,
};
