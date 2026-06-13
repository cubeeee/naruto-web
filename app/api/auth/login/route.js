import { callGameApi, md5, translateMessage } from "@/lib/gameApi";

export const runtime = "nodejs";

export async function POST(req) {
  let data = {};
  try {
    data = await req.json();
  } catch {
    data = {};
  }

  const username = String(data.username || "").trim();
  const password = String(data.password || "");

  if (!username || !password) {
    return Response.json(
      { status: "error", message: "Please enter your username and password." },
      { status: 400 }
    );
  }

  const { status, body } = await callGameApi("/api/v1/auth/login.php", {
    username,
    password: md5(password),
  });

  if (body && body.message) body.message = translateMessage(body.message);
  return Response.json(body, { status });
}
