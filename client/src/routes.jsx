import { useNavigate, useRoutes } from "react-router-dom";
import Device from "./views/Device";
import Devices from "./views/Devices";
import NotFound from "./views/NotFound";

export const Router = () => {
  const routes = [
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/",
      element: <Devices />,
    },
    {
      path: "/:ip",
      element: <Device />,
    },
  ];

  return useRoutes(routes);
};
