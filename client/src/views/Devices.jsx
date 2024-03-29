import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getDevices, getMyIp } from "../api";
import Container from "../components/Container";
import { useData } from "../store";

const Devices = () => {
  const { devices, myIp } = useData();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDevices(devices, setLoading, dispatch);
    getMyIp(myIp, dispatch);
  }, []);

  if (loading)
    return (
      <div className="w-screen h-screen text-center flex flex-col justify-around gap-y-10 items-center">
        <div>
          <Spinner />
        </div>
        <p className="text-center">Scanning your network</p>
      </div>
    );

  return (
    <Container col>
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
          {devices.length > 0 ? (
            devices?.map((device) => (
              <Link key={device.mac} to={device.ip}>
                <Card device={device} />
              </Link>
            ))
          ) : (
            <p className="text-xl text-gray-700">No devices found</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Devices;
