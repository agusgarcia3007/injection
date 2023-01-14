import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import Devices from "./views/Devices";

const App = () => {
  return (
    <div className="p-5">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
};

export default App;
