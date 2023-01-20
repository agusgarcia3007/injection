import { useRoutes } from "react-router-dom";
import Device from "./views/Device";
import Devices from "./views/Devices";

export const Router = () => {
  const routes = [
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
