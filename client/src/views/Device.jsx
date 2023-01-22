import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDeviceName } from "../helpers/getDeviceName";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const Device = () => {
  const { ip } = useParams();
  const navigate = useNavigate();

  const { devices } = useSelector((state) => state);

  const [values, setValues] = useState({ min: 0, max: 65000 });

  const device = devices.find((device) => device.ip === ip);

  return (
    <div className="flex flex-col">
      <button onClick={() => navigate(-1)}>
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.4939 20.5644C11.1821 20.8372 10.7083 20.8056 10.4356 20.4939L3.43557 12.4939C3.18814 12.2111 3.18814 11.7889 3.43557 11.5061L10.4356 3.50613C10.7083 3.1944 11.1822 3.16281 11.4939 3.43557C11.8056 3.70834 11.8372 4.18216 11.5644 4.49388L5.65283 11.25L20 11.25C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75L5.65283 12.75L11.5644 19.5061C11.8372 19.8179 11.8056 20.2917 11.4939 20.5644Z"
            fill="#030D45"
          />
        </svg>
      </button>

      <main className="mt-5">
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
      </main>

      <section>
        <h1 className="mt-5">Search for open ports in this device</h1>
        <div className="mt-7">
          <RangeSlider
            min={0}
            max={65000}
            value={[values.min, values.max]}
            onChange={(e) =>
              setValues({
                min: e.target.value[0],
                max: e.target.value[1],
              })
            }
          />
        </div>
      </section>
    </div>
  );
};

export default Device;
