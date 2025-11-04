import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import Features from "../Features";
import { renderWithProviders } from "../../../test/utils";

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  Video: () => <svg data-testid="video-icon">Video</svg>,
  Mic: () => <svg data-testid="mic-icon">Mic</svg>,
  CheckCircle: () => <svg data-testid="check-circle-icon">CheckCircle</svg>,
  Brain: () => <svg data-testid="brain-icon">Brain</svg>,
  Target: () => <svg data-testid="target-icon">Target</svg>,
  TrendingUp: () => <svg data-testid="trending-up-icon">TrendingUp</svg>,
}));

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe("Features Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the main heading and subtitle", () => {
    renderWithProviders(<Features />);
    expect(
      screen.getByText("Powerful Features for Success")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Everything you need to excel in your interviews, powered by cutting-edge AI technology"
      )
    ).toBeInTheDocument();
  });

  it("renders header with data-testid attributes", () => {
    renderWithProviders(<Features />);
    expect(screen.getByTestId("features-header")).toBeInTheDocument();
    expect(screen.getByTestId("features-title")).toBeInTheDocument();
    expect(screen.getByTestId("features-subtitle")).toBeInTheDocument();
  });

  it("renders all feature cards", () => {
    renderWithProviders(<Features />);
    expect(screen.getByText("Realistic Simulations")).toBeInTheDocument();
    expect(screen.getByText("Speech Recognition")).toBeInTheDocument();
    expect(screen.getByText("Instant Feedback")).toBeInTheDocument();
    expect(screen.getByText("AI-Powered Analysis")).toBeInTheDocument();
    expect(screen.getByText("Targeted Practice")).toBeInTheDocument();
    expect(screen.getByText("Progress Tracking")).toBeInTheDocument();
  });

  it("renders feature descriptions", () => {
    renderWithProviders(<Features />);
    expect(
      screen.getByText(
        "Experience interviews that mirror real-world scenarios with industry-specific questions."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Practice your verbal communication with advanced AI that understands natural speech."
      )
    ).toBeInTheDocument();
  });

  it("renders feature icons", () => {
    renderWithProviders(<Features />);
    expect(screen.getByTestId("video-icon")).toBeInTheDocument();
    expect(screen.getByTestId("mic-icon")).toBeInTheDocument();
    expect(screen.getByTestId("check-circle-icon")).toBeInTheDocument();
    expect(screen.getByTestId("brain-icon")).toBeInTheDocument();
    expect(screen.getByTestId("target-icon")).toBeInTheDocument();
    expect(screen.getByTestId("trending-up-icon")).toBeInTheDocument();
  });

  it("applies correct gradient colors to icons", () => {
    renderWithProviders(<Features />);
    const gradientElements = document.querySelectorAll(".bg-gradient-to-r");
    expect(gradientElements.length).toBeGreaterThan(0);
  });

  it("has proper responsive grid layout", () => {
    renderWithProviders(<Features />);
    const grid = document.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3");
  });

  it("includes hover effects on feature cards", () => {
    renderWithProviders(<Features />);
    const cards = document.querySelectorAll(".group");
    expect(cards.length).toBeGreaterThan(0);
    cards.forEach((card) => {
      expect(card).toHaveClass("hover:scale-105");
    });
  });

  it("renders with proper spacing and padding", () => {
    renderWithProviders(<Features />);
    const section = document.querySelector("section");
    expect(section).toHaveClass("py-20", "md:py-32");
  });

  it("includes background gradient effects", () => {
    renderWithProviders(<Features />);
    const backgroundElements = document.querySelectorAll(".bg-gradient-to-br");
    expect(backgroundElements.length).toBeGreaterThan(0);
  });

  it("has proper accessibility with semantic structure", () => {
    renderWithProviders(<Features />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.length).toBe(6); // 6 features
  });

  it("includes animation classes for visibility", () => {
    renderWithProviders(<Features />);
    const animatedElements = document.querySelectorAll(".transform");
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  it("renders feature cards with shadow effects", () => {
    renderWithProviders(<Features />);
    const cards = document.querySelectorAll(".shadow-lg");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("includes proper transition effects", () => {
    renderWithProviders(<Features />);
    const transitionElements = document.querySelectorAll(".transition-all");
    expect(transitionElements.length).toBeGreaterThan(0);
  });

  it("has correct container and padding classes", () => {
    renderWithProviders(<Features />);
    const container = document.querySelector(".container");
    expect(container).toHaveClass("px-4", "md:px-6", "mx-auto");
  });

  it("renders text with gradient effects", () => {
    renderWithProviders(<Features />);
    const gradientText = document.querySelector(
      ".bg-gradient-to-r.from-gray-900"
    );
    expect(gradientText).toBeInTheDocument();
  });
});
