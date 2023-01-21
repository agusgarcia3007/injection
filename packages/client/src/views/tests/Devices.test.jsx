import Devices from "../Devices";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";

const ProviderWrap = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

describe("Devices", () => {
  test("component renders", () => {
    render(<Devices />, { wrapper: ProviderWrap });

    expect(screen.getByText("Connected devices")).toBeDefined();
  });
});
