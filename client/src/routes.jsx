import { useRoutes } from "react-router-dom";
import Device from "./views/Device";
import Devices from "./views/Devices";
import NotFound from "./views/NotFound";
import PortScanner from "./views/PortScanner";

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
    {
      path: "/port-scanner",
      element: <PortScanner />,
    },
  ];

  return useRoutes(routes);
};
