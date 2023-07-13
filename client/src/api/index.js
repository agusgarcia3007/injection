import { addDevices, addMyIp } from "../store/slices/devicesSlice";
import http from "../http";

export const getDevices = async (devices, setLoading, dispatch) => {
  if (devices?.length === 0) setLoading(true);
  try {
    const res = await http.get("/devices");
    dispatch(addDevices(res.data));
    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
};

export const getMyIp = async (myIp, dispatch) => {
  try {
    if (!myIp) {
      const res = await http.get("/ip");
      dispatch(addMyIp(res.data.ipAddress));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getVulnerabilities = async (ip, setStatus) => {
  setStatus("loading");
  try {
    const res = await http.get(`/vuln?ip=${ip}`);
    setStatus("success");
    return res.data;
  } catch (error) {
    console.log(error);
    setStatus("error");
  }
};
