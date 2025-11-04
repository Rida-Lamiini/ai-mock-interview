import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import HowItWorks from "../HowItWorks";
import { renderWithProviders } from "../../../test/utils";

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  ArrowRight: () => <svg data-testid="arrow-right-icon">ArrowRight</svg>,
}));

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe("HowItWorks Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the main heading and subtitle", () => {
    renderWithProviders(<HowItWorks />);
    expect(screen.getByText("How It Works")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Three simple steps to transform your interview skills and land your dream job"
      )
    ).toBeInTheDocument();
  });

  it("renders header with data-testid attributes", () => {
    renderWithProviders(<HowItWorks />);
    expect(screen.getByTestId("how-it-works-header")).toBeInTheDocument();
    expect(screen.getByTestId("how-it-works-title")).toBeInTheDocument();
    expect(screen.getByTestId("how-it-works-subtitle")).toBeInTheDocument();
  });

  it("renders all step numbers and titles", () => {
    renderWithProviders(<HowItWorks />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Choose Your Path")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("Practice with AI")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByText("Get Smart Feedback")).toBeInTheDocument();
  });

  it("renders step descriptions", () => {
    renderWithProviders(<HowItWorks />);
    expect(
      screen.getByText(
        "Select from various job types, industries, and difficulty levels tailored to your career goals."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Engage in realistic interview simulations with our advanced AI that adapts to your responses."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Receive detailed analysis, personalized tips, and actionable insights to improve your performance."
      )
    ).toBeInTheDocument();
  });

  it("renders step circles with gradient backgrounds", () => {
    renderWithProviders(<HowItWorks />);
    const stepCircles = document.querySelectorAll(".bg-gradient-to-r");
    expect(stepCircles.length).toBe(3); // 3 steps
  });

  it("includes connection line for desktop view", () => {
    renderWithProviders(<HowItWorks />);
    const connectionLine = document.querySelector(
      ".bg-gradient-to-r.from-blue-200"
    );
    expect(connectionLine).toBeInTheDocument();
  });

  it("renders arrow icons between steps on desktop", () => {
    renderWithProviders(<HowItWorks />);
    const arrows = screen.getAllByTestId("arrow-right-icon");
    expect(arrows.length).toBe(2); // 2 arrows between 3 steps
  });

  it("has proper responsive grid layout", () => {
    renderWithProviders(<HowItWorks />);
    const grid = document.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1", "lg:grid-cols-3");
  });

  it("includes animation classes for visibility", () => {
    renderWithProviders(<HowItWorks />);
    const animatedElements = document.querySelectorAll(".transform");
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  it("renders with proper spacing and padding", () => {
    renderWithProviders(<HowItWorks />);
    const section = document.querySelector("section");
    expect(section).toHaveClass("py-20", "md:py-32");
  });

  it("applies gradient background to section", () => {
    renderWithProviders(<HowItWorks />);
    const section = document.querySelector("section");
    expect(section).toHaveClass(
      "bg-gradient-to-br",
      "from-gray-50",
      "to-blue-50"
    );
  });

  it("has proper accessibility with semantic structure", () => {
    renderWithProviders(<HowItWorks />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.length).toBe(3); // 3 steps
  });

  it("includes shadow effects on step cards", () => {
    renderWithProviders(<HowItWorks />);
    const cards = document.querySelectorAll(".shadow-lg");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("renders step numbers with correct styling", () => {
    renderWithProviders(<HowItWorks />);
    const stepNumbers = screen.getAllByText(/0[1-3]/);
    expect(stepNumbers.length).toBe(3);
    stepNumbers.forEach((number) => {
      expect(number).toHaveClass("text-2xl", "font-bold", "text-white");
    });
  });

  it("includes proper transition effects", () => {
    renderWithProviders(<HowItWorks />);
    const transitionElements = document.querySelectorAll(".transition-all");
    expect(transitionElements.length).toBeGreaterThan(0);
  });

  it("has correct container and padding classes", () => {
    renderWithProviders(<HowItWorks />);
    const container = document.querySelector(".container");
    expect(container).toHaveClass("px-4", "md:px-6", "mx-auto");
  });

  it("renders text with gradient effects", () => {
    renderWithProviders(<HowItWorks />);
    const gradientText = document.querySelector(
      ".bg-gradient-to-r.from-gray-900"
    );
    expect(gradientText).toBeInTheDocument();
  });
});
