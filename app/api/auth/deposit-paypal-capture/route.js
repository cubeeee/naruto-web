import { GAME_API_BASE } from "@/lib/gameApi";

export const runtime = "nodejs";

const PAYKEY = process.env.TICKET_CLIENT_PAYKEY || "Poke123";

// Capture đơn PayPal sau khi buyer approve → server credit ticket (giao qua thư).
export async function POST(req) {
  let data = {};
  try {
    data = await req.json();
  } catch {
    data = {};
  }

  const paypal_order_id = String(data.paypal_order_id || "").trim();
  if (!paypal_order_id) {
    return Response.json({ ok: false, msg: "Missing order information." }, { status: 400 });
  }

  const form = new URLSearchParams({ paykey: PAYKEY, paypal_order_id });

  let res;
  try {
    res = await fetch(`${GAME_API_BASE}/ajax/capture_deposit_paypal.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: form.toString(),
      cache: "no-store",
    });
  } catch {
    return Response.json(
      { ok: false, msg: "Could not connect to the payment server." },
      { status: 502 }
    );
  }

  let body;
  try {
    body = await res.json();
  } catch {
    body = { ok: false, msg: "The payment server returned invalid data." };
  }

  return Response.json(body, { status: res.ok ? 200 : res.status });
}
