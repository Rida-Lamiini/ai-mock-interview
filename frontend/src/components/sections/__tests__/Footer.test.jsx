import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import Footer from "../Footer";
import { renderWithProviders } from "../../../test/utils";

// Mock Logo component
vi.mock("../ui/logo", () => ({
  Logo: () => <div data-testid="logo">EC2 Interview Coach</div>,
}));

describe("Footer Component", () => {
  it("renders the logo", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByTestId("footer-logo")).toBeInTheDocument();
    expect(screen.getByTestId("footer-logo-container")).toBeInTheDocument();
  });

  it("renders footer links", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders copyright text", () => {
    renderWithProviders(<Footer />);
    expect(
      screen.getByText("© 2024 AI Mock Interview. All rights reserved.")
    ).toBeInTheDocument();
  });

  it("applies correct background and text colors", () => {
    renderWithProviders(<Footer />);
    const footer = document.querySelector("footer");
    expect(footer).toHaveClass("bg-gray-900", "text-white");
  });

  it("has proper flex layout for desktop", () => {
    renderWithProviders(<Footer />);
    const container = document.querySelector(".flex");
    expect(container).toHaveClass("md:flex-row");
  });

  it("includes proper spacing classes", () => {
    renderWithProviders(<Footer />);
    const container = document.querySelector(".flex");
    expect(container).toHaveClass(
      "justify-between",
      "items-center",
      "space-y-4",
      "md:space-y-0"
    );
  });

  it("renders links with hover effects", () => {
    renderWithProviders(<Footer />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveClass(
        "hover:text-white",
        "transition-colors",
        "duration-300"
      );
    });
  });

  it("has proper container padding", () => {
    renderWithProviders(<Footer />);
    const container = document.querySelector(".container");
    expect(container).toHaveClass("px-4", "md:px-6", "mx-auto");
  });

  it("includes proper footer padding", () => {
    renderWithProviders(<Footer />);
    const footer = document.querySelector("footer");
    expect(footer).toHaveClass("py-8");
  });

  it("renders links as anchor tags", () => {
    renderWithProviders(<Footer />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(3);
    links.forEach((link) => {
      expect(link.tagName).toBe("A");
    });
  });

  it("links have placeholder href attributes", () => {
    renderWithProviders(<Footer />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "#");
    });
  });
});
