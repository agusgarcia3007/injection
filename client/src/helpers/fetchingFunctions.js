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

export const getVulnerabilities = async (ip, ports, setStatus) => {
  setStatus("loading");
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/vuln?ip=${ip}&ports=${ports}`,
      {
        timeout: 20000,
      }
    );
    setStatus("success");
    return res.data;
  } catch (error) {
    console.log(error);
    setStatus("error");
  }
};
