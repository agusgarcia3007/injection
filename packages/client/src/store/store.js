import { configureStore } from "@reduxjs/toolkit";
import { devicesSlice } from "./slices/devicesSlice";

const store = configureStore({
  reducer: devicesSlice.reducer,
});

export default store;
