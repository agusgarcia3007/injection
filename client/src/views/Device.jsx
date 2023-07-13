import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVulnerabilities } from "../api";
import { getDeviceName } from "../helpers/getDeviceName";
import ArrowSvg from "../components/ArrowSvg";
import Table from "../components/Table";
import Container from "../components/Container";
import { useData } from "../store";

const Device = () => {
  const { ip } = useParams();
  const navigate = useNavigate();

  const { devices } = useData();

  const [vulnerabilities, setVulnerabilities] = useState({});
  const [status, setStatus] = useState("");

  const device = devices.find((device) => device.ip === ip);

  const handleScan = async () => {
    setVulnerabilities({});
    getVulnerabilities(ip, setStatus)
      .then(setVulnerabilities)
      .catch((error) => setError(error.message));
  };

  useEffect(() => {
    if (!device) {
      navigate("/");
    }
  }, [device]);

  useEffect(() => {
    if (status === "error") {
      const timer = setTimeout(() => {
        setStatus("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <Container col>
      <button onClick={() => navigate(-1)}>
        <ArrowSvg />
      </button>

      <div className="mt-5">
        <div className="block rounded-xl border border-gray-800 bg-gray-900 p-8 shadow-xl">
          <h3 className="mt-3 text-xl font-bold text-white">Device Info:</h3>

          <p className="mt-4 text-sm text-gray-300">
            Device Name: {getDeviceName(device?.name)}
          </p>
          <p className="mt-4 text-sm text-gray-300">IP: {device?.ip}</p>
          <p className="mt-4 text-sm text-gray-300">
            Mac Address: {device?.mac}
          </p>
        </div>
      </div>

      <section className="mx-3">
        <h1 className="mt-5 text-center sm:text-left">
          Search for open ports in this device
        </h1>
        <div className="mt-7 flex flex-col  justify-center sm:justify-start sm:flex-row items-center gap-5">
          <button
            onClick={handleScan}
            disabled={status === "loading"}
            className="inline-flex gap-x-3 items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 disabled:bg-gray-400"
          >
            {status === "loading" ? "Scanning..." : "Scan"}
          </button>
          {status === "error" ? (
            <p className="text-red-500 text-center ">
              Error looking for open ports. please try again or reduce the ports
              range
            </p>
          ) : null}
        </div>

        {vulnerabilities?.ports !== [] &&
        vulnerabilities.os !== "" &&
        Object.keys(vulnerabilities).length > 0 ? (
          <Table data={vulnerabilities} />
        ) : status === "loading" ? null : (
          <p className="text-center my-4">
            No open ports found. Please try again
          </p>
        )}
      </section>
    </Container>
  );
};

export default Device;
