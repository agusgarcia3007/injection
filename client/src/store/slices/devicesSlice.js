import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  devices: [],
  myIp: "",
};

export const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    addDevices: (state, action) => {
      state.devices = action.payload;
    },
    addMyIp: (state, action) => {
      state.myIp = action.payload;
    },
  },
});

export const { addDevices, addMyIp } = devicesSlice.actions;

export default devicesSlice.reducer;
