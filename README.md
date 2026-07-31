# Ledger — USD virtual accounts → USDT

A dashboard for giving people a US bank account (account + routing number)
that automatically converts whatever lands in it to USDT in one preset
wallet, using Bridge.xyz.

Right now it runs on realistic **sample data** so you can see and click
through the whole thing before Bridge approves your API access. Flip one
switch later (add two environment variables) and it starts using real data.

## What's in here

- **Overview** — your virtual account's number/routing details, how much
  has settled to your wallet, how much is mid-conversion, recent activity.
- **Transactions** — the full USD-in / USDT-out ledger.
- **Settings** — where you set the preset USDT wallet address, and see
  whether Bridge is connected yet.
- One password gate protects the whole dashboard (this is built for you as
  a single operator, not public sign-ups — see "Growing beyond one
  operator" below).

## Getting it online (no coding required)

You don't need to install anything on your computer to see this live on
the internet. The easiest path:

1. **Create a free GitHub account** at github.com, if you don't have one.
2. **Create a new repository** and upload this entire folder to it (GitHub's
   website has an "upload files" button — drag the whole folder in).
3. **Create a free Vercel account** at vercel.com, and choose "sign up with
   GitHub."
4. In Vercel, click **"Add New Project"** and pick the repository you just
   created. Vercel will detect it's a Next.js app automatically — you don't
   need to change any settings.
5. Before clicking Deploy, add one environment variable:
   - `DASHBOARD_PASSWORD` → whatever password you want to use to sign in.
6. Click **Deploy**. In about a minute you'll get a live web address like
   `your-project.vercel.app` — that's your dashboard.

If any of these steps trip you up, **Claude Code** (Anthropic's coding
tool) can walk through this deployment with you step by step, or do it for
you directly.

## Going live with Bridge

Once Bridge approves your API access:

1. In the Bridge dashboard, generate an **API key**.
2. Create a Bridge **customer** object for yourself (this is the identity
   your virtual account belongs to — Bridge will walk you through the KYC
   fields it needs). Note the customer ID it gives you back.
3. In Vercel, go to your project → Settings → Environment Variables, and add:
   - `BRIDGE_API_KEY` → the key from step 1
   - `BRIDGE_CUSTOMER_ID` → the id from step 2
4. Redeploy (Vercel does this automatically when you save new environment
   variables, or click "Redeploy").

That's it — the dashboard immediately starts reading and writing real data.
Every screen was built to read from `lib/bridge.ts`, so nothing else needs
to change.

### Webhook (recommended once live)

Point Bridge's webhook settings at:

```
https://your-project.vercel.app/api/bridge/webhook
```

This lets Bridge notify your app the moment a deposit or conversion status
changes, instead of only refreshing when you load a page. See the comments
in `app/api/bridge/webhook/route.ts` — before relying on it, add Bridge's
signature verification so you know events are genuinely from Bridge.

## Where things live in the code

```
lib/bridge.ts             ← the ONLY file that talks to Bridge's API
lib/mock-data.ts          ← sample data used until BRIDGE_API_KEY is set
app/dashboard/            ← the three dashboard pages
app/api/bridge/           ← API endpoints this app exposes (wallet, webhook, etc.)
data/settings.json        ← stores your preset wallet address (pre-launch)
```

## A few honest limitations

- **The wallet address storage is a simple file**, good enough for testing
  and for getting started. On Vercel specifically, file writes don't
  persist between deployments — if that matters before you've gone live
  with Bridge, ask a developer (or Claude Code) to swap
  `data/settings.json` for a small database table; it's a short change.
- **One shared password, not per-customer accounts.** This app assumes
  you're the one receiving USD, not that you're onboarding many separate
  customers with their own logins. See below if that's actually what you need.
- **Not audited.** This is a solid starting point, not a finished
  production financial product — have someone review it (security and
  otherwise) before real money flows through it at scale.

## Growing beyond one operator

If your real goal is many customers each getting their own virtual account
and their own login (a multi-tenant product, not just your own receiving
account), this dashboard is a good frontend to build on, but you'll want to
add: a real database, per-customer authentication, and a loop that creates
a Bridge customer + virtual account for each new sign-up. That's a bigger
project — worth scoping with a developer or Claude Code once you know
Bridge's onboarding requirements for your customers.
