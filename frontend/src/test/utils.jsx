import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

// Create a custom render function that includes providers
const AllTheProviders = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as renderWithProviders };
