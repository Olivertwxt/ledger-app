import { isBridgeLive } from "@/lib/bridge";
import WalletForm from "./wallet-form";
import { promises as fs } from "fs";
import path from "path";

async function getCurrentWallet() {
  const settingsPath = path.join(process.cwd(), "data", "settings.json");
  const raw = await fs.readFile(settingsPath, "utf-8");
  return JSON.parse(raw).presetWalletAddress as string;
}

export default async function SettingsPage() {
  const live = isBridgeLive();
  const currentWallet = await getCurrentWallet();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold mb-1">Settings</h1>
      <p className="text-paper/50 text-sm mb-8">
        Your destination wallet, and your Bridge connection.
      </p>

      <section className="mb-10">
        <h2 className="text-sm font-medium mb-1">Destination wallet</h2>
        <p className="text-xs text-paper/40 mb-4">
          Every USD deposit converts and settles here. Double-check this
          address — sending to the wrong network or address can't be undone.
        </p>
        <WalletForm currentWallet={currentWallet} />
      </section>

      <section className="rounded-lg border border-line bg-ink-800 p-5">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${live ? "bg-settle status-live" : "bg-pending"}`}
          />
          <h2 className="text-sm font-medium">
            {live ? "Connected to Bridge.xyz" : "Not connected yet"}
          </h2>
        </div>

        {live ? (
          <p className="text-xs text-paper/50 leading-relaxed">
            Requests are going to the live Bridge API. Everything on this
            dashboard reflects your real account.
          </p>
        ) : (
          <div className="text-xs text-paper/50 leading-relaxed space-y-2">
            <p>This dashboard is running on sample data. Once Bridge approves your account:</p>
            <ol className="list-decimal list-inside space-y-1 text-paper/60">
              <li>Create a customer object for yourself via Bridge and note its ID.</li>
              <li>
                Add <code className="font-mono text-settle">BRIDGE_API_KEY</code> and{" "}
                <code className="font-mono text-settle">BRIDGE_CUSTOMER_ID</code> to your
                environment variables.
              </li>
              <li>Redeploy — every screen switches to live data automatically.</li>
            </ol>
            <p className="pt-1">Full steps are in README.md.</p>
          </div>
        )}
      </section>
    </div>
  );
}
