import { render, wait } from "@testing-library/react";
import Devices from "./Devices";
import { getDevices, getMyIp } from "../helpers/fetchingFunctions";

jest.mock("../helpers/fetchingFunctions", () => {
  return {
    getDevices: jest.fn(),
    getMyIp: jest.fn(),
  };
});

describe("Devices", () => {
  test("on initial render, devices are fetched", async () => {
    const mockDevices = [{ mac: "123", ip: "192.168.1.1", name: "Device1" }];
    getDevices.mockResolvedValue(mockDevices);
    getMyIp.mockResolvedValue(mockDevices[0].ip);

    const { findByText } = render(<Devices />);

    const device = await findByText(/Device/i);
    expect(device).toBeInTheDocument();
    expect(getDevices).toHaveBeenCalled();
    expect(getMyIp).toHaveBeenCalled();
  });
});
