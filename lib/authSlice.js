import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Toàn bộ dữ liệu tài khoản trả về sau khi đăng nhập (username, account_id, email, token...)
  account: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.account = action.payload || null;
    },
    logout: (state) => {
      state.account = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

// Selectors
export const selectAccount = (s) => s.auth.account;
export const selectIsAuthenticated = (s) => !!s.auth.account;
export const selectIdentifier = (s) =>
  s.auth.account ? s.auth.account.username || s.auth.account.account_id || "" : "";
// redux-persist gắn cờ này sau khi khôi phục xong state từ localStorage.
export const selectRehydrated = (s) => Boolean(s._persist && s._persist.rehydrated);

export default authSlice.reducer;
