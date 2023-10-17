import { useData } from "../store";

const PortScanner = () => {
  const { myIp } = useData();
  console.log(myIp);
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-3xl font-semibold text-gray-800 text-center p-4">
        Port Scanner
      </h1>
      <div>
        <input
          type="text"
          placeholder={`target ex: ${myIp}`}
          className="block w-3/4 mx-auto rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default PortScanner;
