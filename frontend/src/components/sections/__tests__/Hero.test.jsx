import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import Hero from "../Hero";
import { renderWithProviders } from "../../../test/utils";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }) => (
      <section {...props}>{children}</section>
    ),
  },
}));

describe("Hero Component", () => {
  it("renders the main heading", () => {
    renderWithProviders(<Hero />);
    expect(screen.getByText("Master Your Interviews")).toBeInTheDocument();
    expect(screen.getByText("with AI Confidence")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    renderWithProviders(<Hero />);
    expect(
      screen.getByText(
        "Transform your interview skills with our advanced AI coach. Get personalized feedback, practice realistic scenarios, and boost your confidence for any interview."
      )
    ).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    renderWithProviders(<Hero />);
    expect(screen.getByText("Start Free Practice")).toBeInTheDocument();
    expect(screen.getByText("Watch Demo")).toBeInTheDocument();
  });

  it("renders the badge with sparkles icon", () => {
    renderWithProviders(<Hero />);
    expect(
      screen.getByText("Dev-Powered Interview Practice dev")
    ).toBeInTheDocument();
    expect(screen.getByTestId("hero-badge")).toBeInTheDocument();
    expect(screen.getByTestId("sparkles-icon")).toBeInTheDocument();
  });

  it("renders statistics section", () => {
    renderWithProviders(<Hero />);
    expect(
      screen.getByText("10,000+ Interviews Practiced")
    ).toBeInTheDocument();
    expect(screen.getByText("95% Success Rate")).toBeInTheDocument();
    expect(screen.getByText("AI-Powered Feedback")).toBeInTheDocument();
  });

  it("applies correct CSS classes for animations", () => {
    renderWithProviders(<Hero />);

    // Check for background gradient
    const backgroundElement = document.querySelector(
      ".bg-gradient-to-r.from-blue-600\\/10"
    );
    expect(backgroundElement).toBeInTheDocument();

    // Check for animated elements
    const animatedElements = document.querySelectorAll(".animate-pulse");
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  it("has proper responsive design classes", () => {
    renderWithProviders(<Hero />);

    // Check for responsive text sizes
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass(
      "text-4xl",
      "sm:text-5xl",
      "md:text-6xl",
      "lg:text-7xl"
    );

    // Check for responsive padding
    const section = document.querySelector("section");
    expect(section).toHaveClass("py-20", "md:py-32", "lg:py-40");
  });

  it("renders with gradient text effects", () => {
    renderWithProviders(<Hero />);

    const gradientText = document.querySelector(
      ".bg-gradient-to-r.from-blue-600"
    );
    expect(gradientText).toBeInTheDocument();
  });

  it("includes accessibility-friendly button structure", () => {
    renderWithProviders(<Hero />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);

    // Check for proper button styling
    buttons.forEach((button) => {
      expect(button).toHaveClass("px-8", "py-4", "text-lg", "font-semibold");
    });
  });
});
