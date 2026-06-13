import { GAME_API_BASE } from "@/lib/gameApi";

export const runtime = "nodejs";

const PAYKEY = process.env.TICKET_CLIENT_PAYKEY || "Poke123";

// Lịch sử nạp ticket (deposit) của 1 account.
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const account_id = (searchParams.get("account_id") || "").trim();

  if (!account_id) {
    return Response.json({ ok: false, msg: "Missing account." }, { status: 400 });
  }

  const form = new URLSearchParams({ paykey: PAYKEY, account_id, limit: "100" });

  let res;
  try {
    res = await fetch(`${GAME_API_BASE}/gameAPI/getDepositHistory.php`, {
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
