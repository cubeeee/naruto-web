import { GAME_API_BASE } from "@/lib/gameApi";

export const runtime = "nodejs";

const PAYKEY = process.env.TICKET_CLIENT_PAYKEY || "Poke123";

// Kiểm tra trạng thái 1 đơn nạp ticket (deposit) theo order_id (ràng buộc account_id).
export async function POST(req) {
  let data = {};
  try {
    data = await req.json();
  } catch {
    data = {};
  }

  const account_id = String(data.account_id || "").trim();
  const order_id = String(data.order_id || "").trim();

  if (!account_id || !order_id) {
    return Response.json({ ok: false, msg: "Missing order information." }, { status: 400 });
  }

  const form = new URLSearchParams({ paykey: PAYKEY, account_id, order_id });

  let res;
  try {
    res = await fetch(`${GAME_API_BASE}/ajax/check_deposit.php`, {
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
