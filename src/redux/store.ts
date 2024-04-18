import { configureStore } from "@reduxjs/toolkit";
import { omdbApi } from "@/redux/service/omdbApi";
import appReducer from "@/redux/app/slices";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [omdbApi.reducerPath]: omdbApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([omdbApi.middleware]),
});
