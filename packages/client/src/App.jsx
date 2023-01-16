import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import store from "./store/store";

const App = () => {
  return (
    <div className="p-5">
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
