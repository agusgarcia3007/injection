const Table = ({ data }) => {
  return (
    <table className="table-auto my-5 w-full divide-y max-w-xl divide-gray-300 border border-separate rounded-lg">
      <thead>
        <tr>
          <th className="py-2 bg-gray-50 rounded-t-lg">Open Ports</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((vuln, index) => (
          <tr key={index} className="grid grid-cols-2 my-2">
            {vuln.status === "open" ? (
              <>
                <td className="text-center">{vuln.port}</td>
                <td className="text-green-500 text-center">{vuln.status}</td>
              </>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
