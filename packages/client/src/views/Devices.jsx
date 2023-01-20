import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { addDevices, addMyIp } from "../store/slices/devicesSlice";

const Devices = () => {
  const { devices, myIp } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const getDevices = async () => {
    if (devices?.length === 0) setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/devices`);
      dispatch(addDevices(res.data));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getMyIp = async () => {
    try {
      if (!myIp) {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/ip`);
        dispatch(addMyIp(res.data.ipAddress));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDevices();
    getMyIp();
  }, []);

  if (loading)
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <Spinner />
        <p className="mt-8">Scanning your network</p>
      </div>
    );

  return (
    <div>
      <div className="sm:flex sm:items-center ">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Connected devices
          </h1>
          <p className="mt-2 text-lg text-gray-700">
            A list of all connected devices
          </p>
        </div>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
          {devices?.map((device) => (
            <Link key={device.mac} to={device.ip}>
              <Card device={device} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Devices;
