import { getTransactions } from "@/lib/bridge";

function money(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function statusStyle(status: string) {
  if (status === "completed") return "bg-settle/10 text-settle";
  if (status === "processing") return "bg-pending/10 text-pending";
  return "bg-alert/10 text-alert";
}

export default async function TransactionsPage() {
  const transactions = await getTransactions();

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-2xl font-semibold mb-1">Transactions</h1>
      <p className="text-paper/50 text-sm mb-8">
        Every USD deposit and the USDT it settled as.
      </p>

      <div className="rounded-lg border border-line overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ink-700 text-left text-xs uppercase tracking-widest text-paper/40">
              <th className="px-5 py-3 font-normal">From</th>
              <th className="px-5 py-3 font-normal">Date</th>
              <th className="px-5 py-3 font-normal text-right">USD in</th>
              <th className="px-5 py-3 font-normal text-right">Fee</th>
              <th className="px-5 py-3 font-normal text-right">USDT settled</th>
              <th className="px-5 py-3 font-normal text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {transactions.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-paper/40">
                  Nothing here yet.
                </td>
              </tr>
            )}
            {transactions.map((t: any) => (
              <tr key={t.id} className="bg-ink-800">
                <td className="px-5 py-4">{t.sender_name}</td>
                <td className="px-5 py-4 text-paper/50 font-mono text-xs">
                  {new Date(t.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-5 py-4 text-right font-mono tabular">${money(t.amount_usd)}</td>
                <td className="px-5 py-4 text-right font-mono tabular text-paper/40">
                  ${money(t.fee_usd)}
                </td>
                <td className="px-5 py-4 text-right font-mono tabular text-settle">
                  {t.amount_usdt ? money(t.amount_usdt) : "—"}
                </td>
                <td className="px-5 py-4 text-right">
                  <span
                    className={`inline-block text-xs font-mono uppercase tracking-widest px-2 py-1 rounded ${statusStyle(
                      t.status
                    )}`}
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
