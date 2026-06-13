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
  const email = String(data.email || "").trim();

  if (!username || !password) {
    return Response.json(
      { status: "error", message: "Please enter your username and password." },
      { status: 400 }
    );
  }

  // Mirror lại validate của webapi: 6-12 ký tự, chữ thường + số.
  if (!/^[a-z0-9]{6,12}$/.test(username)) {
    return Response.json(
      {
        status: "error",
        message: "Username must be 6-12 characters, lowercase letters and numbers only.",
      },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return Response.json(
      { status: "error", message: "Password must be at least 6 characters." },
      { status: 400 }
    );
  }

  const { status, body } = await callGameApi("/api/v1/auth/register.php", {
    username,
    password: md5(password),
    email,
  });

  if (body && body.message) body.message = translateMessage(body.message);
  return Response.json(body, { status });
}
