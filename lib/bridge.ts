// ---------------------------------------------------------------------------
// Bridge.xyz client
// ---------------------------------------------------------------------------
// Every call to Bridge's API goes through this file. Nothing else in the app
// talks to Bridge directly. That means once your API key is approved, this
// is the ONLY file you (or a developer) need to touch to go live —
// everything upstream (dashboard, settings, transaction list) already reads
// from the functions below and doesn't care where the data comes from.
//
// Docs: https://apidocs.bridge.xyz
// Base URL: https://api.bridge.xyz/v0
// Auth: header "Api-Key: <your key>"
//
// HOW THIS WORKS RIGHT NOW
// If BRIDGE_API_KEY is not set, every function below returns realistic
// sample data (from lib/mock-data.ts) so the app is fully clickable during
// your Bridge onboarding. The moment you set BRIDGE_API_KEY and
// BRIDGE_CUSTOMER_ID in your environment, real requests take over — no code
// changes required.
// ---------------------------------------------------------------------------

import {
  mockVirtualAccount,
  mockTransactions,
  mockBalance,
} from "./mock-data";

const BRIDGE_BASE_URL = "https://api.bridge.xyz/v0";

function isLive() {
  return Boolean(process.env.BRIDGE_API_KEY && process.env.BRIDGE_CUSTOMER_ID);
}

async function bridgeFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BRIDGE_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Api-Key": process.env.BRIDGE_API_KEY as string,
      ...options.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Bridge API error ${res.status}: ${body}`);
  }
  return res.json();
}

// -- Customers ----------------------------------------------------------
// A "customer" in Bridge is the person or business the virtual account
// belongs to (this goes through KYC/KYB). For a single-operator setup
// (you, receiving your own USD), you create one customer for yourself once
// and store its id as BRIDGE_CUSTOMER_ID. See README.md for the one-time
// setup script.
// TODO once live: POST /customers  (KYC fields per Bridge's onboarding docs)

// -- Virtual accounts -----------------------------------------------------

export async function getVirtualAccount() {
  if (!isLive()) return mockVirtualAccount;

  const customerId = process.env.BRIDGE_CUSTOMER_ID;
  const list = await bridgeFetch(`/customers/${customerId}/virtual_accounts`);
  return list?.data?.[0] ?? null;
}

export async function createVirtualAccount(destinationWalletAddress: string) {
  if (!isLive()) return mockVirtualAccount;

  const customerId = process.env.BRIDGE_CUSTOMER_ID;
  return bridgeFetch(`/customers/${customerId}/virtual_accounts`, {
    method: "POST",
    headers: { "Idempotency-Key": crypto.randomUUID() },
    body: JSON.stringify({
      source: { currency: "usd" },
      destination: {
        payment_rail: "polygon", // change to your preferred chain: ethereum | polygon | solana | base
        currency: "usdt",
        address: destinationWalletAddress,
      },
    }),
  });
}

// Repoints an existing virtual account at a new USDT wallet — this is what
// the "Save wallet" button in Settings will call once you're live.
export async function updateVirtualAccountDestination(
  virtualAccountId: string,
  destinationWalletAddress: string
) {
  if (!isLive()) return { ...mockVirtualAccount, destination: { ...mockVirtualAccount.destination, address: destinationWalletAddress } };

  const customerId = process.env.BRIDGE_CUSTOMER_ID;
  return bridgeFetch(`/customers/${customerId}/virtual_accounts/${virtualAccountId}`, {
    method: "PUT",
    body: JSON.stringify({
      destination: {
        payment_rail: "polygon",
        currency: "usdt",
        address: destinationWalletAddress,
      },
    }),
  });
}

// -- Transaction history ---------------------------------------------------

export async function getTransactions() {
  if (!isLive()) return mockTransactions;

  const customerId = process.env.BRIDGE_CUSTOMER_ID;
  const account = await getVirtualAccount();
  if (!account) return [];

  const history = await bridgeFetch(
    `/customers/${customerId}/virtual_accounts/${account.id}/history`
  );
  return history?.data ?? [];
}

// -- Balance ----------------------------------------------------------------
// Bridge doesn't hold a running "balance" for you the way an exchange does —
// your USDT settles directly to your own wallet. This helper is a
// convenience that sums recent completed transactions for the dashboard's
// summary tiles. Swap it out if you'd rather read the balance straight from
// your wallet/chain (e.g. via an RPC call or block explorer API).

export async function getSettlementSummary() {
  if (!isLive()) return mockBalance;

  const txns = await getTransactions();
  const completed = txns.filter((t: any) => t.status === "completed");
  const processing = txns.filter((t: any) => t.status !== "completed");

  return {
    currency: "usdt",
    available: completed.reduce((sum: number, t: any) => sum + (t.amount_usdt ?? 0), 0),
    pending: processing.reduce((sum: number, t: any) => sum + (t.amount_usd ?? 0), 0),
  };
}

export { isLive as isBridgeLive };
