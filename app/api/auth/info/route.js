import { GAME_API_BASE } from "@/lib/gameApi";

export const runtime = "nodejs";

// Lấy thông tin tài khoản từ webapi (user-info.php). Token Bearer = username hoặc account_id.
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const identifier = (searchParams.get("u") || "").trim();

  if (!identifier) {
    return Response.json(
      { status: "error", message: "Missing account information." },
      { status: 400 }
    );
  }

  let res;
  try {
    res = await fetch(`${GAME_API_BASE}/api/v1/users/user-info.php`, {
      method: "GET",
      headers: { Authorization: `Bearer ${identifier}` },
      cache: "no-store",
    });
  } catch {
    return Response.json(
      { status: "error", message: "Could not connect to the game server." },
      { status: 502 }
    );
  }

  let body;
  try {
    body = await res.json();
  } catch {
    body = { status: "error", message: "The game server returned invalid data." };
  }

  return Response.json(body, { status: res.status });
}
