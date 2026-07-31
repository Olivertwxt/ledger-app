import { NextRequest, NextResponse } from "next/server";

// Bridge sends events here (e.g. payment_processed, payment_submitted) as
// deposits move through the pipeline. Point Bridge's webhook config at:
//   https://YOUR-DOMAIN.com/api/bridge/webhook
//
// TODO before going live:
// 1. Verify the request is genuinely from Bridge. Bridge signs webhook
//    payloads — check the signature per the "Webhooks" section of
//    https://apidocs.bridge.xyz before trusting the body below.
// 2. Store/act on the event (e.g. mark a transaction as settled, notify
//    yourself). Right now this just logs it so you can see events arriving
//    during testing.

export async function POST(req: NextRequest) {
  const event = await req.json();

  console.log("[bridge webhook]", event?.event_type ?? "unknown event", event);

  // Bridge expects a 200 response quickly to acknowledge receipt.
  return NextResponse.json({ received: true });
}
