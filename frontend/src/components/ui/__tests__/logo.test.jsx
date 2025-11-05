import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { Logo } from "../logo";
import { renderWithProviders } from "../../../test/utils";

// Mock lucide-react
vi.mock("lucide-react", () => ({
  Bot: () => <svg data-testid="bot-icon">Bot Icon</svg>,
}));

describe("Logo Component", () => {
  it("renders the logo text", () => {
    renderWithProviders(<Logo />);
    expect(screen.getByText("EC2")).toBeInTheDocument();
    expect(screen.getByText("Interview Coach")).toBeInTheDocument();
  });

  it("renders with correct CSS classes", () => {
    renderWithProviders(<Logo />);
    const logoContainer = screen.getByText("EC2").parentElement.parentElement;
    expect(logoContainer).toHaveClass("flex", "items-center", "space-x-2");
  });

  it("renders the bot icon", () => {
    renderWithProviders(<Logo />);
    expect(screen.getByTestId("bot-icon")).toBeInTheDocument();
  });

  it("renders the online indicator", () => {
    renderWithProviders(<Logo />);
    const indicator = document.querySelector(".bg-green-400");
    expect(indicator).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    renderWithProviders(<Logo />);

    // Check main container
    const container = screen.getByText("EC2").parentElement.parentElement;
    expect(container).toHaveClass("flex", "items-center", "space-x-2");

    // Check icon container
    const iconContainer = screen.getByTestId("bot-icon").parentElement;
    expect(iconContainer).toHaveClass(
      "flex",
      "items-center",
      "justify-center",
      "w-10",
      "h-10",
      "rounded-lg",
      "shadow-lg",
      "bg-gradient-to-br",
      "from-blue-600",
      "to-purple-600"
    );

    // Check text styling
    const ec2Text = screen.getByText("EC2");
    expect(ec2Text).toHaveClass(
      "text-2xl",
      "font-bold",
      "text-transparent",
      "bg-gradient-to-r",
      "from-blue-600",
      "to-purple-600",
      "bg-clip-text"
    );

    const subtitle = screen.getByText("Interview Coach");
    expect(subtitle).toHaveClass("-mt-1", "text-xs", "text-gray-500");
  });

  it("has proper structure", () => {
    renderWithProviders(<Logo />);

    // Logo should be in a div with flex layout
    const logoElement = screen.getByText("EC2").closest("div");
    expect(logoElement).toBeInTheDocument();

    // Should have icon and text sections - check for the actual structure
    const iconSection = logoElement.previousElementSibling;
    const textSection = logoElement;

    expect(iconSection).toBeInTheDocument();
    expect(textSection).toBeInTheDocument();
  });

  it("renders gradient backgrounds correctly", () => {
    renderWithProviders(<Logo />);

    // Check for gradient classes
    const gradientElements = document.querySelectorAll(".bg-gradient-to-br");
    expect(gradientElements.length).toBeGreaterThan(0);

    const gradientText = document.querySelectorAll(".bg-gradient-to-r");
    expect(gradientText.length).toBeGreaterThan(0);
  });
});
