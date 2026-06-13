"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store";

// Chỉ bọc Provider ở gốc (không dùng PersistGate toàn cục) để trang chủ vẫn
// được SSR bình thường. persistStore() trong store.js tự khôi phục phiên ở client;
// các trang cần đăng nhập sẽ chờ cờ rehydrated (xem selectRehydrated) trước khi
// quyết định chuyển hướng.
export default function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
