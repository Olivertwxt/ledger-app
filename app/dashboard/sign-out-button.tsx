"use client";

import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await fetch("/api/session", { method: "DELETE" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="w-full text-left text-sm text-paper/50 hover:text-paper px-3 py-2 rounded-md hover:bg-ink-700 transition-colors"
    >
      Sign out
    </button>
  );
}
