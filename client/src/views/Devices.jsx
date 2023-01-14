import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDevices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/devices`);
      setDevices(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDevices();
  }, []);

  return (
    <div>
      <div className="sm:flex sm:items-center ">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Connected devices
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all connected devices
          </p>
        </div>
      </div>
      <div className="mt-8">
        {!loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {devices?.map((device) => (
              <Link key={device.mac} to={device.mac}>
                <Card device={device} />
              </Link>
            ))}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Devices;
