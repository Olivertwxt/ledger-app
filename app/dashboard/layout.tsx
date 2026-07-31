import Link from "next/link";
import { isBridgeLive } from "@/lib/bridge";
import SignOutButton from "./sign-out-button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const live = isBridgeLive();

  return (
    <div className="min-h-screen bg-ink text-paper flex">
      <aside className="w-60 shrink-0 border-r border-line px-5 py-6 flex flex-col">
        <p className="font-display text-lg font-semibold mb-8">Ledger</p>

        <nav className="flex flex-col gap-1 text-sm">
          <Link
            href="/dashboard"
            className="rounded-md px-3 py-2 hover:bg-ink-700 transition-colors"
          >
            Overview
          </Link>
          <Link
            href="/dashboard/transactions"
            className="rounded-md px-3 py-2 hover:bg-ink-700 transition-colors"
          >
            Transactions
          </Link>
          <Link
            href="/dashboard/settings"
            className="rounded-md px-3 py-2 hover:bg-ink-700 transition-colors"
          >
            Settings
          </Link>
        </nav>

        <div className="mt-auto">
          <div className="rounded-md border border-line px-3 py-3 mb-4">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  live ? "bg-settle status-live" : "bg-pending"
                }`}
              />
              <p className="font-mono text-xs uppercase tracking-widest text-paper/60">
                {live ? "Live" : "Sample data"}
              </p>
            </div>
            <p className="text-xs text-paper/40 leading-relaxed">
              {live
                ? "Connected to Bridge.xyz"
                : "Add your Bridge API key in Settings once approved."}
            </p>
          </div>
          <SignOutButton />
        </div>
      </aside>

      <main className="flex-1 px-10 py-8">{children}</main>
    </div>
  );
}
