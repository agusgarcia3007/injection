import React from "react";

const Table = ({ data }) => {
  if (!data) return null;

  return (
    <div className="table-container flex flex-col items-center my-6 max-w-4xl">
      <p className="p-3 bg-gray-50 border w-full">{data.os}</p>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border bg-gray-50 px-4 py-2">Port</th>
            <th className="border bg-gray-50 px-4 py-2">Protocol</th>
            <th className="border bg-gray-50 px-4 py-2">State</th>
            <th className="border bg-gray-50 px-4 py-2">Service</th>
          </tr>
        </thead>
        <tbody>
          {data?.ports?.map((port, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 font-semibold">{port.port}</td>
              <td className="whitespace-nowrap border px-3 text-center py-5 text-sm text-gray-500">
                <span className="inline-flex items-center rounded-md bg-teal-50 px-2 py-1 text-xs font-medium text-teal-700 ring-1 ring-inset ring-green-600/20">
                  {port.protocol}
                </span>
              </td>
              <td className="whitespace-nowrap border px-3 text-center py-5 text-sm text-gray-500">
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {port.state}
                </span>
              </td>
              <td className="whitespace-nowrap border px-3 text-center py-5 text-sm text-gray-500">
                <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-green-600/20">
                  {port.service}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
