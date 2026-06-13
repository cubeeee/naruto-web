import { callGameApi, md5 } from "@/lib/gameApi";

export const runtime = "nodejs";

export async function POST(req) {
  let data = {};
  try {
    data = await req.json();
  } catch {
    data = {};
  }

  const username = String(data.username || "").trim();
  const current = String(data.current_password || "");
  const next = String(data.new_password || "");
  const confirm = String(data.confirm_password || "");

  if (!username) {
    return Response.json(
      { status: "error", message: "Missing account." },
      { status: 400 }
    );
  }
  if (next.length < 6 || next.length > 32) {
    return Response.json(
      { status: "error", message: "New password must be 6 to 32 characters." },
      { status: 400 }
    );
  }
  if (next !== confirm) {
    return Response.json(
      { status: "error", message: "Passwords do not match." },
      { status: 400 }
    );
  }

  // Nếu có nhập mật khẩu hiện tại -> xác minh bằng cách thử đăng nhập.
  if (current) {
    const login = await callGameApi("/api/v1/auth/login.php", {
      username,
      password: md5(current),
    });
    const ok =
      login.status >= 200 &&
      login.status < 300 &&
      login.body &&
      login.body.status === "success";
    if (!ok) {
      return Response.json(
        { status: "error", message: "Current password is incorrect." },
        { status: 400 }
      );
    }
  }

  // Change Password (webapi lưu pass_md5 = md5(plaintext) ở cả Mongo + MySQL).
  const res = await callGameApi("/api/v1/users/change-password.php", {
    username,
    new_password: next,
  });
  const body = res.body || {};

  if (res.status >= 200 && res.status < 300 && body.ret === true) {
    return Response.json({ status: "success", message: "Password changed successfully." });
  }

  return Response.json(
    { status: "error", message: body.err || "Failed to change password, please try again." },
    { status: res.status || 500 }
  );
}
