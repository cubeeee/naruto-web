import { GAME_API_BASE } from "@/lib/gameApi";

export const runtime = "nodejs";

// Shared secret cho game-client (paykey mode) — server-side only, KHÔNG lộ ra browser.
const PAYKEY = process.env.TICKET_CLIENT_PAYKEY || "Poke123";

// Tạo đơn nạp ticket qua Cryptomus (crypto / Binance). Trả về payment_url để chuyển hướng.
export async function POST(req) {
  let data = {};
  try {
    data = await req.json();
  } catch {
    data = {};
  }

  const account_id = String(data.account_id || "").trim();
  const role_id = String(data.role_id || "").trim();
  const tickets = parseInt(data.tickets, 10);

  if (!account_id || !role_id) {
    return Response.json(
      { ok: false, msg: "Please select a character first." },
      { status: 400 }
    );
  }
  if (!/^[0-9a-f]{24}$/i.test(role_id)) {
    return Response.json(
      { ok: false, msg: "Invalid character id." },
      { status: 400 }
    );
  }
  if (!Number.isInteger(tickets) || tickets < 1) {
    return Response.json(
      { ok: false, msg: "Please choose a valid amount." },
      { status: 400 }
    );
  }

  const form = new URLSearchParams({
    paykey: PAYKEY,
    account_id,
    role_id,
    tickets: String(tickets),
  });

  let res;
  try {
    res = await fetch(`${GAME_API_BASE}/ajax/create_deposit_crypto.php`, {
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
      { ok: false, msg: "Could not connect to the payment server. Please try again." },
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
