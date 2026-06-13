import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import authReducer from "./authSlice";

// Storage an toàn cho SSR: trên server (không có window) trả về noop để tránh lỗi.
function createNoopStorage() {
  return {
    getItem: () => Promise.resolve(null),
    setItem: (_key, value) => Promise.resolve(value),
    removeItem: () => Promise.resolve(),
  };
}

const storage =
  typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: "ninja-web",
  version: 1,
  storage,
  whitelist: ["auth"], // chỉ lưu phiên đăng nhập
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
