import { NextResponse } from "next/server";

/**
 * Placeholder dispatch endpoint. Replace the body with a real CRM /
 * Slack webhook / email / Twilio integration in production.
 *
 * Returns 200 + a synthetic ticket id so the client can render success.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    // eslint-disable-next-line no-console
    console.log("[KPC dispatch]", body);
    const ticket = `KPC-${Date.now().toString(36).toUpperCase()}`;
    return NextResponse.json({ ok: true, ticket }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 400 });
  }
}
