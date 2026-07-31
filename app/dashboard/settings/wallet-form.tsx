"use client";

import { useState } from "react";

export default function WalletForm({ currentWallet }: { currentWallet: string }) {
  const [value, setValue] = useState(currentWallet);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSave() {
    setStatus("saving");
    const res = await fetch("/api/bridge/wallet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ walletAddress: value }),
    });
    setStatus(res.ok ? "saved" : "error");
    if (res.ok) setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-md bg-ink-800 border border-line px-3 py-2.5 font-mono text-sm text-paper focus:border-settle transition-colors"
        placeholder="0x..."
        spellCheck={false}
      />
      <div className="flex items-center gap-3 mt-3">
        <button
          onClick={handleSave}
          disabled={status === "saving" || !value || value === currentWallet}
          className="rounded-md bg-settle px-4 py-2 text-sm font-medium text-ink disabled:opacity-40 hover:bg-settle-dim hover:text-paper transition-colors"
        >
          {status === "saving" ? "Saving…" : "Save wallet"}
        </button>
        {status === "saved" && <span className="text-xs text-settle">Saved</span>}
        {status === "error" && (
          <span className="text-xs text-alert">Couldn't save — try again.</span>
        )}
      </div>
    </div>
  );
}
