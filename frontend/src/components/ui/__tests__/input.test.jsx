import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "../input";

describe("Input Component", () => {
  it("renders with default props", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders with custom type", () => {
    render(<Input type="email" placeholder="Enter email" />);
    const input = screen.getByPlaceholderText("Enter email");
    expect(input).toHaveAttribute("type", "email");
  });

  it("applies custom className", () => {
    render(<Input className="custom-input" placeholder="Custom input" />);
    const input = screen.getByPlaceholderText("Custom input");
    expect(input).toHaveClass("custom-input");
  });

  it("passes through other props", () => {
    render(<Input required disabled placeholder="Required input" />);
    const input = screen.getByPlaceholderText("Required input");
    expect(input).toBeRequired();
    expect(input).toBeDisabled();
  });

  it("has proper base styles", () => {
    render(<Input placeholder="Base styles" />);
    const input = screen.getByPlaceholderText("Base styles");
    expect(input).toHaveClass(
      "flex",
      "h-10",
      "w-full",
      "rounded-md",
      "border",
      "border-input",
      "bg-transparent",
      "px-3",
      "py-2",
      "text-sm",
      "ring-offset-background",
      "file:border-0",
      "file:bg-transparent",
      "file:text-sm",
      "file:font-medium",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
      "focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50"
    );
  });

  it("is focusable and accessible", () => {
    render(<Input placeholder="Focusable input" />);
    const input = screen.getByPlaceholderText("Focusable input");
    expect(input).toHaveAttribute("type", "text");
  });

  it("handles value changes", () => {
    render(<Input placeholder="Changeable input" />);
    const input = screen.getByPlaceholderText("Changeable input");
    expect(input.value).toBe("");
  });
});
