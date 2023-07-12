import { configureStore } from "@reduxjs/toolkit";
import { devicesSlice } from "./slices/devicesSlice";
import { useSelector } from "react-redux";

const store = configureStore({
  reducer: devicesSlice.reducer,
});

const useData = () => {
  const data = useSelector((state) => state);

  if (!data) {
    throw new Error("something went wrong");
  }

  return data;
};

export { store, useData };
