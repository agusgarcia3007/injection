import { useNavigate, useParams } from "react-router-dom";

const Device = () => {
  const { mac } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back
      </button>
      <p> Device {mac}</p>
    </div>
  );
};

export default Device;
