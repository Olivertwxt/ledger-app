import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink text-paper">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="flex items-center gap-2 text-sm text-settle mb-16">
          <span className="h-1.5 w-1.5 rounded-full bg-settle status-live" />
          <span className="font-mono uppercase tracking-widest">Settlement rail</span>
        </div>

        <h1 className="font-display text-5xl md:text-6xl font-semibold leading-[1.05] max-w-3xl">
          Give them a US bank account.
          <br />
          <span className="text-settle">Keep your balance in USDT.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-paper/70">
          Every customer gets a dedicated USD account number and routing
          number. Whatever lands in it is converted and swept straight to
          your USDT wallet — no manual conversion, no spreadsheet.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <Link
            href="/login"
            className="rounded-md bg-settle px-6 py-3 font-medium text-ink hover:bg-settle-dim hover:text-paper transition-colors"
          >
            Open dashboard
          </Link>
          <span className="text-sm text-paper/50 font-mono">
            Bridge.xyz integration — pending live access
          </span>
        </div>

        <div className="mt-24 grid gap-px bg-line md:grid-cols-3 rounded-lg overflow-hidden border border-line">
          {[
            {
              label: "Receive",
              copy: "A dedicated USD virtual account — account and routing numbers, ready to share with anyone paying you in dollars.",
            },
            {
              label: "Convert",
              copy: "Deposits are converted to USDT automatically the moment they clear. No trading, no timing the market.",
            },
            {
              label: "Settle",
              copy: "USDT lands in a single preset wallet you control. Every conversion is logged in the ledger below.",
            },
          ].map((item) => (
            <div key={item.label} className="bg-ink-800 p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-settle mb-3">
                {item.label}
              </p>
              <p className="text-sm text-paper/70 leading-relaxed">{item.copy}</p>
            </div>
          ))}
        </div>

        <p className="mt-16 text-xs text-paper/40 font-mono max-w-xl">
          This dashboard currently runs on sample data. Once Bridge.xyz
          approves API access, add the API key in Settings and every screen
          switches to live data automatically.
        </p>
      </div>
    </main>
  );
}
