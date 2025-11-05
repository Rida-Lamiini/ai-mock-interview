import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import Testimonials from "../Testimonials";
import { renderWithProviders } from "../../../test/utils";

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  Star: () => <svg data-testid="star-icon">Star</svg>,
  Quote: () => <svg data-testid="quote-icon">Quote</svg>,
}));

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe("Testimonials Component", () => {
  it("renders the main heading and subtitle", () => {
    renderWithProviders(<Testimonials />);
    expect(screen.getByText("Success Stories")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Join thousands of professionals who've landed their dream jobs with our AI interview coach"
      )
    ).toBeInTheDocument();
  });

  it("renders all testimonial cards", () => {
    renderWithProviders(<Testimonials />);
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
    expect(screen.getByText("Marcus Johnson")).toBeInTheDocument();
    expect(screen.getByText("Emily Rodriguez")).toBeInTheDocument();
    expect(screen.getByText("David Kim")).toBeInTheDocument();
  });

  it("renders testimonial roles and companies", () => {
    renderWithProviders(<Testimonials />);
    expect(screen.getByText("Software Engineer at Google")).toBeInTheDocument();
    expect(
      screen.getByText("Product Manager at Microsoft")
    ).toBeInTheDocument();
    expect(screen.getByText("Data Scientist at Netflix")).toBeInTheDocument();
    expect(screen.getByText("UX Designer at Airbnb")).toBeInTheDocument();
  });

  it("renders testimonial content", () => {
    renderWithProviders(<Testimonials />);
    expect(
      screen.getByText(
        '"This AI mock interview tool completely transformed my interview preparation. The realistic simulations and detailed feedback helped me identify my weak points and improve them systematically."'
      )
    ).toBeInTheDocument();
  });

  it("renders star ratings", () => {
    renderWithProviders(<Testimonials />);
    const stars = screen.getAllByTestId("star-icon");
    expect(stars.length).toBe(20); // 4 testimonials × 5 stars each
  });

  it("renders company badges", () => {
    renderWithProviders(<Testimonials />);
    expect(screen.getByText("Now at Google")).toBeInTheDocument();
    expect(screen.getByText("Now at Microsoft")).toBeInTheDocument();
    expect(screen.getByText("Now at Netflix")).toBeInTheDocument();
    expect(screen.getByText("Now at Airbnb")).toBeInTheDocument();
  });

  it("renders quote icons", () => {
    renderWithProviders(<Testimonials />);
    const quotes = screen.getAllByTestId("quote-icon");
    expect(quotes.length).toBe(4); // One for each testimonial
  });

  it("applies correct gradient background", () => {
    renderWithProviders(<Testimonials />);
    const section = document.querySelector("section");
    expect(section).toHaveClass("bg-white");
  });

  it("has proper responsive grid layout", () => {
    renderWithProviders(<Testimonials />);
    const grid = document.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-2");
  });

  it("includes animation classes", () => {
    renderWithProviders(<Testimonials />);
    const animatedElements = document.querySelectorAll(".transform");
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  it("renders with proper spacing and padding", () => {
    renderWithProviders(<Testimonials />);
    const section = document.querySelector("section");
    expect(section).toHaveClass("py-20", "md:py-32");
  });

  it("includes shadow effects on cards", () => {
    renderWithProviders(<Testimonials />);
    const cards = document.querySelectorAll(".shadow-lg");
    expect(cards.length).toBe(4); // 4 testimonial cards
  });

  it("has proper container and padding classes", () => {
    renderWithProviders(<Testimonials />);
    const container = document.querySelector(".container");
    expect(container).toHaveClass("px-4", "md:px-6", "mx-auto");
  });

  it("renders gradient text for heading", () => {
    renderWithProviders(<Testimonials />);
    const gradientText = document.querySelector(
      ".bg-gradient-to-r.from-gray-900"
    );
    expect(gradientText).toBeInTheDocument();
  });

  it("includes hover effects on cards", () => {
    renderWithProviders(<Testimonials />);
    const cards = document.querySelectorAll('[class*="hover:scale-105"]');
    expect(cards.length).toBe(4);
  });

  it("renders avatar fallbacks with initials", () => {
    renderWithProviders(<Testimonials />);
    expect(screen.getByText("SC")).toBeInTheDocument();
    expect(screen.getByText("MJ")).toBeInTheDocument();
    expect(screen.getByText("ER")).toBeInTheDocument();
    expect(screen.getByText("DK")).toBeInTheDocument();
  });
});
