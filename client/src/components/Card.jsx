import { getDeviceName } from "../helpers/getDeviceName";
import { classNames } from "../helpers/classNames";
import { useData } from "../store";

const Card = ({ device }) => {
  const { myIp } = useData();

  return (
    <div
      className={classNames(
        "relative block h-full rounded-xl border p-4 shadow-md hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300",
        myIp == device.ip ? "border-green-600 border-2" : "border-gray-100"
      )}
    >
      <span className="absolute right-4 top-4 rounded-full bg-green-100 px-1.5 py-1.5 text-xs font-medium text-green-600">
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke="#212529"
            strokeWidth="2"
            d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M7,12 L11,15 L16,8"
          />
        </svg>
      </span>

      <div className="mt-4 text-gray-500 sm:pr-8">
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17 6V5h-2V2H3v14h5v4h3.25H11a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6zm-5.75 14H3a2 2 0 0 1-2-2V2c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5.75zM11 8v8h6V8h-6zm3 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
        </svg>

        <h3 className="mt-4 text-lg font-bold text-gray-900">
          {getDeviceName(device.name)}
        </h3>
        <p className="mt-2 text-sm sm:block">
          <span className="font-bold">IP:</span> {device.ip}
        </p>
        <p className="mt-2 text-sm sm:block">
          <span className="font-semibold">MAC:</span> {device.mac}
        </p>

        {myIp == device.ip && (
          <h2 className="mt-4 font-semibold text-base">My device</h2>
        )}
      </div>
    </div>
  );
};

export default Card;
