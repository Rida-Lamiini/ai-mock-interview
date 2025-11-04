import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import CTA from "../CTA";
import { renderWithProviders } from "../../../test/utils";

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  ArrowRight: () => <svg data-testid="arrow-right-icon">ArrowRight</svg>,
  CheckCircle: () => <svg data-testid="check-circle-icon">CheckCircle</svg>,
  Sparkles: () => <svg data-testid="sparkles-icon">Sparkles</svg>,
}));

describe("CTA Component", () => {
  it("renders the main heading and subtitle", () => {
    renderWithProviders(<CTA />);
    expect(
      screen.getByText("Ready to Ace Your Next Interview?")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Start your journey to interview success today. Get personalized AI coaching and land your dream job with confidence."
      )
    ).toBeInTheDocument();
  });

  it("renders the badge with sparkles icon", () => {
    renderWithProviders(<CTA />);
    expect(
      screen.getByText("Join 50,000+ Successful Candidates")
    ).toBeInTheDocument();
    expect(screen.getByTestId("sparkles-icon")).toBeInTheDocument();
  });

  it("renders the email input and submit button", () => {
    renderWithProviders(<CTA />);
    expect(
      screen.getByPlaceholderText("Enter your email address")
    ).toBeInTheDocument();
    expect(screen.getByText("Get Started Free")).toBeInTheDocument();
    expect(screen.getByTestId("arrow-right-icon")).toBeInTheDocument();
  });

  it("handles email submission successfully", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    renderWithProviders(<CTA />);

    const input = screen.getByPlaceholderText("Enter your email address");
    const button = screen.getByText("Get Started Free");

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Submitted email:",
      "test@example.com"
    );

    await waitFor(() => {
      expect(
        screen.getByText("Thank you! We'll be in touch soon.")
      ).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  it("shows success message after submission", async () => {
    renderWithProviders(<CTA />);

    const input = screen.getByPlaceholderText("Enter your email address");
    const button = screen.getByText("Get Started Free");

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId("check-circle-icon")).toBeInTheDocument();
      expect(
        screen.getByText("Thank you! We'll be in touch soon.")
      ).toBeInTheDocument();
    });
  });

  it("renders benefit points", () => {
    renderWithProviders(<CTA />);
    expect(screen.getByText("Free 7-day trial")).toBeInTheDocument();
    expect(screen.getByText("No credit card required")).toBeInTheDocument();
    expect(screen.getByText("Cancel anytime")).toBeInTheDocument();
  });

  it("renders unique data-testid attributes for benefit points", () => {
    renderWithProviders(<CTA />);
    expect(screen.getByTestId("benefit-free-trial")).toBeInTheDocument();
    expect(screen.getByTestId("benefit-no-credit-card")).toBeInTheDocument();
    expect(screen.getByTestId("benefit-cancel-anytime")).toBeInTheDocument();
  });

  it("applies correct gradient background", () => {
    renderWithProviders(<CTA />);
    const section = document.querySelector("section");
    expect(section).toHaveClass(
      "bg-gradient-to-br",
      "from-blue-600",
      "via-purple-600",
      "to-pink-600"
    );
  });

  it("renders animated background elements", () => {
    renderWithProviders(<CTA />);
    const animatedElements = document.querySelectorAll(".animate-pulse");
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  it("has proper responsive design classes", () => {
    renderWithProviders(<CTA />);
    const section = document.querySelector("section");
    expect(section).toHaveClass("py-20", "md:py-32");
  });

  it("includes backdrop blur effects", () => {
    renderWithProviders(<CTA />);
    const backdropElements = document.querySelectorAll(".backdrop-blur-sm");
    expect(backdropElements.length).toBeGreaterThan(0);
  });

  it("renders form with proper validation", () => {
    renderWithProviders(<CTA />);
    const input = screen.getByPlaceholderText("Enter your email address");
    expect(input).toHaveAttribute("required");
    expect(input).toHaveAttribute("type", "email");
  });

  it("prevents submission with empty email", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    renderWithProviders(<CTA />);

    const button = screen.getByText("Get Started Free");
    fireEvent.click(button);

    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it("resets form after successful submission", async () => {
    renderWithProviders(<CTA />);

    const input = screen.getByPlaceholderText("Enter your email address");
    const button = screen.getByText("Get Started Free");

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(input.value).toBe("");
    });
  });

  it("handles multiple submissions correctly", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    renderWithProviders(<CTA />);

    const input = screen.getByPlaceholderText("Enter your email address");
    const button = screen.getByText("Get Started Free");

    // First submission
    fireEvent.change(input, { target: { value: "test1@example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Submitted email:",
        "test1@example.com"
      );
    });

    // Wait for reset
    await waitFor(() => {
      expect(input.value).toBe("");
    });

    // Second submission
    fireEvent.change(input, { target: { value: "test2@example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Submitted email:",
        "test2@example.com"
      );
    });

    consoleSpy.mockRestore();
  });
});
