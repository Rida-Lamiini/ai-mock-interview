import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../button";

describe("Button Component", () => {
  it("renders with default variant and size", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      "bg-primary",
      "text-primary-foreground",
      "h-10",
      "py-2",
      "px-4"
    );
  });

  it("renders with outline variant", () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole("button", { name: /outline button/i });
    expect(button).toHaveClass("border", "border-input", "hover:bg-accent");
  });

  it("renders with lg size", () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole("button", { name: /large button/i });
    expect(button).toHaveClass("h-11", "px-8");
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const button = screen.getByRole("button", { name: /custom button/i });
    expect(button).toHaveClass("custom-class");
  });

  it("passes through other props", () => {
    render(
      <Button type="submit" disabled>
        Submit
      </Button>
    );
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeDisabled();
  });

  it("has proper base styles", () => {
    render(<Button>Base Styles</Button>);
    const button = screen.getByRole("button", { name: /base styles/i });
    expect(button).toHaveClass(
      "inline-flex",
      "items-center",
      "justify-center",
      "rounded-md",
      "text-sm",
      "font-medium",
      "transition-colors",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
      "focus-visible:ring-offset-2",
      "disabled:opacity-50",
      "disabled:pointer-events-none",
      "ring-offset-background"
    );
  });

  it("renders children correctly", () => {
    render(<Button>Button Text</Button>);
    expect(screen.getByText("Button Text")).toBeInTheDocument();
  });

  it("is focusable and accessible", () => {
    render(<Button>Focusable Button</Button>);
    const button = screen.getByRole("button", { name: /focusable button/i });
    expect(button).toHaveAttribute("type", "button"); // default type
  });
});
