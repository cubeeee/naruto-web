import crypto from "node:crypto";

// Base URL của webapi PHP (game backend). Có thể đổi qua biến môi trường GAME_API_BASE.
export const GAME_API_BASE = (
  process.env.GAME_API_BASE || "https://api.siwgame.com"
).replace(/\/+$/, "");

// Game lưu mật khẩu dưới dạng pass_md5 = md5(plaintext).
// API webapi (api/v1/auth/*) so sánh trực tiếp giá trị gửi lên với pass_md5,
// nên ta phải md5 mật khẩu trước khi gửi để tương thích tài khoản game.
export function md5(value) {
  return crypto.createHash("md5").update(String(value)).digest("hex");
}

// Gọi tới một endpoint của webapi và chuẩn hoá kết quả trả về.
export async function callGameApi(path, payload) {
  const url = `${GAME_API_BASE}${path}`;
  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch {
    return {
      status: 502,
      body: {
        status: "error",
        message: "Could not connect to the game server. Please try again later.",
      },
    };
  }

  let body;
  try {
    body = await res.json();
  } catch {
    body = {
      status: "error",
      message: "The game server returned invalid data.",
    };
  }

  return { status: res.status, body };
}

// The deployed PHP backend returns some messages in Vietnamese. Map the known
// ones to English so the UI stays fully English.
const MESSAGE_EN = {
  "Vui lòng nhập đầy đủ thông tin": "Please fill in all required fields",
  "Đăng nhập thành công": "Login successful",
  "Sai thông tin đăng nhập": "Invalid login credentials",
  "Đăng ký thành công": "Registration successful",
  "Tên đăng nhập đã tồn tại": "Username already exists",
  "Tên đăng nhập phải từ 6-12 ký tự, chỉ chứa chữ thường và số":
    "Username must be 6-12 characters, lowercase letters and numbers only",
};

export function translateMessage(msg) {
  if (!msg || typeof msg !== "string") return msg;
  if (MESSAGE_EN[msg]) return MESSAGE_EN[msg];
  if (msg.startsWith("Lỗi server:")) return msg.replace("Lỗi server:", "Server error:");
  return msg;
}
