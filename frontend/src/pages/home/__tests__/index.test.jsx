import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import LandingPage from "../index";
import { renderWithProviders } from "../../../test/utils";

// Mock all section components
vi.mock("../../components/sections/Hero", () => ({
  default: () => <div data-testid="hero-section">Hero Section</div>,
}));

vi.mock("../../components/sections/Features", () => ({
  default: () => <div data-testid="features-section">Features Section</div>,
}));

vi.mock("../../components/sections/HowItWorks", () => ({
  default: () => (
    <div data-testid="how-it-works-section">How It Works Section</div>
  ),
}));

vi.mock("../../components/sections/Testimonials", () => ({
  default: () => (
    <div data-testid="testimonials-section">Testimonials Section</div>
  ),
}));

vi.mock("../../components/sections/CTA", () => ({
  default: () => <div data-testid="cta-section">CTA Section</div>,
}));

vi.mock("../../components/sections/Footer", () => ({
  default: () => <div data-testid="footer-section">Footer Section</div>,
}));

describe("LandingPage Component", () => {
  it("renders all main sections", () => {
    renderWithProviders(<LandingPage />);

    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("features-section")).toBeInTheDocument();
    expect(screen.getByTestId("how-it-works-section")).toBeInTheDocument();
    expect(screen.getByTestId("testimonials-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("footer-section")).toBeInTheDocument();
  });

  it("has correct page structure", () => {
    renderWithProviders(<LandingPage />);

    // Check for main element
    const mainElement = document.querySelector("main");
    expect(mainElement).toBeInTheDocument();

    // Check for flex layout
    const container = mainElement.parentElement;
    expect(container).toHaveClass("flex", "flex-col", "min-h-screen");
  });

  it("applies gradient background", () => {
    renderWithProviders(<LandingPage />);

    const container = document.querySelector(".bg-gradient-to-br");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("from-blue-50", "via-white", "to-purple-50");
  });

  it("renders sections in correct order", () => {
    renderWithProviders(<LandingPage />);

    const main = document.querySelector("main");
    const sections = main.children;

    expect(sections[0]).toHaveAttribute("data-testid", "hero-section");
    expect(sections[1]).toHaveAttribute("data-testid", "features-section");
    expect(sections[2]).toHaveAttribute("data-testid", "how-it-works-section");
    expect(sections[3]).toHaveAttribute("data-testid", "testimonials-section");
    expect(sections[4]).toHaveAttribute("data-testid", "cta-section");
  });

  it("includes footer outside main", () => {
    renderWithProviders(<LandingPage />);

    const footer = screen.getByTestId("footer-section");
    const main = document.querySelector("main");

    // Footer should be sibling to main, not inside it
    expect(footer.parentElement).toBe(main.parentElement);
    expect(main.nextElementSibling).toBe(footer);
  });
});
