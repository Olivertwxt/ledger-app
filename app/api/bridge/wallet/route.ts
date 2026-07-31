import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isBridgeLive, getVirtualAccount, updateVirtualAccountDestination } from "@/lib/bridge";

// Before Bridge is live, the preset wallet address is just stored in
// data/settings.json on disk — enough to demo the flow. Once Bridge is
// live, saving a new address here also calls Bridge's API to repoint your
// real virtual account at it (see lib/bridge.ts).
//
// Note: on serverless hosts like Vercel, writes to the filesystem don't
// persist between deployments. If you're deploying there, swap this file
// read/write for a tiny database table (e.g. Vercel KV, Postgres) before
// relying on it in production — see README.md.

const settingsPath = path.join(process.cwd(), "data", "settings.json");

async function readSettings() {
  const raw = await fs.readFile(settingsPath, "utf-8");
  return JSON.parse(raw);
}

export async function GET() {
  const settings = await readSettings();
  return NextResponse.json(settings);
}

export async function POST(req: NextRequest) {
  const { walletAddress } = await req.json();

  if (!walletAddress || typeof walletAddress !== "string") {
    return NextResponse.json({ error: "walletAddress is required" }, { status: 400 });
  }

  const settings = await readSettings();
  settings.presetWalletAddress = walletAddress;
  await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));

  if (isBridgeLive()) {
    const account = await getVirtualAccount();
    if (account?.id) {
      await updateVirtualAccountDestination(account.id, walletAddress);
    }
  }

  return NextResponse.json({ ok: true, settings });
}
