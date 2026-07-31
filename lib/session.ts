import { cookies } from "next/headers";

// This app is built for a single operator (you) rather than public sign-ups.
// It's gated by one shared password stored in the DASHBOARD_PASSWORD
// environment variable. This keeps things simple while you're waiting on
// Bridge access. If you later want real customer-facing accounts, swap this
// for Bridge's own KYC/customer objects plus a proper auth provider
// (e.g. NextAuth, Clerk) — see README.md "Growing beyond one operator".

const SESSION_COOKIE = "ledger_session";

export function isAuthenticated(): boolean {
  const cookieStore = cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === "active";
}

export function sessionCookieName() {
  return SESSION_COOKIE;
}
