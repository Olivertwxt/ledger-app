import { getVirtualAccount, getTransactions, getSettlementSummary } from "@/lib/bridge";
import Link from "next/link";

function money(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function statusColor(status: string) {
  if (status === "completed") return "text-settle";
  if (status === "processing") return "text-pending";
  return "text-alert";
}

export default async function DashboardOverview() {
  const [account, transactions, summary] = await Promise.all([
    getVirtualAccount(),
    getTransactions(),
    getSettlementSummary(),
  ]);

  const recent = transactions.slice(0, 4);

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-2xl font-semibold mb-1">Overview</h1>
      <p className="text-paper/50 text-sm mb-8">
        What's come in, and where it's gone.
      </p>

      {/* Summary tiles */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="rounded-lg border border-line bg-ink-800 p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40 mb-2">
            Settled to wallet
          </p>
          <p className="font-mono text-3xl tabular text-settle">
            {money(summary.available)} <span className="text-lg">USDT</span>
          </p>
        </div>
        <div className="rounded-lg border border-line bg-ink-800 p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40 mb-2">
            Converting now
          </p>
          <p className="font-mono text-3xl tabular text-pending">
            {money(summary.pending)} <span className="text-lg">USD</span>
          </p>
        </div>
      </div>

      {/* Virtual account — the signature ledger-slip card */}
      <div className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-paper/40 mb-3">
          Your USD virtual account
        </p>
        <div className="perf-edge rounded-lg border border-line bg-ink-800 pl-8 pr-6 py-6 relative overflow-hidden">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs text-paper/40 mb-1">Account holder</p>
              <p className="font-medium">
                {account?.source?.account_owner_name ?? "—"}
              </p>
            </div>
            <span
              className={`text-xs font-mono uppercase tracking-widest px-2 py-1 rounded ${
                account?.status === "active"
                  ? "bg-settle/10 text-settle"
                  : "bg-pending/10 text-pending"
              }`}
            >
              {account?.status ?? "unknown"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-paper/40 mb-1">Account number</p>
              <p className="font-mono tabular text-lg">
                {account?.source?.account_number ?? "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-paper/40 mb-1">Routing number</p>
              <p className="font-mono tabular text-lg">
                {account?.source?.routing_number ?? "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-paper/40 mb-1">Bank</p>
              <p className="text-sm">{account?.source?.bank_name ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs text-paper/40 mb-1">Settles to</p>
              <p className="font-mono text-sm truncate" title={account?.destination?.address}>
                {account?.destination?.address ?? "—"}
              </p>
            </div>
          </div>
        </div>
        <p className="text-xs text-paper/40 mt-2">
          Share the account and routing number with anyone paying you in USD.
          Funds convert to USDT automatically —{" "}
          <Link href="/dashboard/settings" className="text-settle hover:underline">
            change the destination wallet
          </Link>
          .
        </p>
      </div>

      {/* Recent activity */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-xs uppercase tracking-widest text-paper/40">
            Recent activity
          </p>
          <Link href="/dashboard/transactions" className="text-xs text-settle hover:underline">
            View all
          </Link>
        </div>
        <div className="rounded-lg border border-line divide-y divide-line overflow-hidden">
          {recent.length === 0 && (
            <p className="p-5 text-sm text-paper/40">
              No deposits yet. Once someone sends USD to your account above, it'll show up here.
            </p>
          )}
          {recent.map((t: any) => (
            <div key={t.id} className="flex items-center justify-between px-5 py-4 bg-ink-800">
              <div>
                <p className="text-sm font-medium">{t.sender_name}</p>
                <p className="text-xs text-paper/40">
                  {new Date(t.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono tabular text-sm">${money(t.amount_usd)}</p>
                <p className={`text-xs font-mono ${statusColor(t.status)}`}>{t.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
