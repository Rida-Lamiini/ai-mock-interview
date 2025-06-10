import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "./../logo";

describe("Logo Component", () => {
  it("renders the logo with correct text", () => {
    render(<Logo />);

    // Check if the logo text is rendered
    expect(screen.getByText("vocaAI")).toBeInTheDocument();
    expect(screen.getByText("Interview Coach")).toBeInTheDocument();
  });

  it("contains the Bot icon", () => {
    render(<Logo />);

    // Check if there's a div with gradient background that would contain the icon
    const logoContainer = document.querySelector(
      ".bg-gradient-to-br.from-blue-600.to-purple-600"
    );
    expect(logoContainer).toBeInTheDocument();
  });

  it("has the correct styling classes", () => {
    render(<Logo />);

    // Check for the main container
    const mainContainer = document.querySelector(
      ".flex.items-center.space-x-2"
    );
    expect(mainContainer).toBeInTheDocument();

    // Check for the gradient text
    const gradientText = document.querySelector(
      ".bg-gradient-to-r.from-blue-600.to-purple-600.bg-clip-text.text-transparent"
    );
    expect(gradientText).toBeInTheDocument();
  });

  it("displays the online indicator", () => {
    render(<Logo />);

    // Check for the green pulse indicator
    const onlineIndicator = document.querySelector(
      ".bg-green-400.rounded-full.animate-pulse"
    );
    expect(onlineIndicator).toBeInTheDocument();
  });

  it("has proper accessibility", () => {
    render(<Logo />);

    // The Bot icon should be rendered as an SVG
    const botIcon = document.querySelector("svg.lucide-bot");
    expect(botIcon).toBeInTheDocument();
  });
});
