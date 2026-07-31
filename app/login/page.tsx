"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setError("That password didn't work. Try again.");
    }
  }

  return (
    <main className="min-h-screen bg-ink flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-line rounded-lg bg-ink-800 p-8"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-settle mb-2">
          Ledger
        </p>
        <h1 className="font-display text-2xl font-semibold text-paper mb-6">
          Sign in
        </h1>

        <label className="block text-sm text-paper/60 mb-2" htmlFor="password">
          Dashboard password
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md bg-ink border border-line px-3 py-2 text-paper mb-1 focus:border-settle transition-colors"
          placeholder="••••••••"
        />
        {error && <p className="text-sm text-alert mt-2">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="mt-6 w-full rounded-md bg-settle py-2.5 font-medium text-ink disabled:opacity-40 hover:bg-settle-dim hover:text-paper transition-colors"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <p className="mt-6 text-xs text-paper/40 font-mono leading-relaxed">
          Set with the DASHBOARD_PASSWORD environment variable. See
          README.md.
        </p>
      </form>
    </main>
  );
}
