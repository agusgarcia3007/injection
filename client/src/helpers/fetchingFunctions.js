import axios from "axios";
import { addDevices, addMyIp } from "../store/slices/devicesSlice";

export const getDevices = async (devices, setLoading, dispatch) => {
  if (devices?.length === 0) setLoading(true);
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/devices`);
    dispatch(addDevices(res.data));
    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
};

export const getMyIp = async (myIp, dispatch) => {
  try {
    if (!myIp) {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/ip`);
      dispatch(addMyIp(res.data.ipAddress));
    }
  } catch (error) {
    console.log(error);
  }
};
