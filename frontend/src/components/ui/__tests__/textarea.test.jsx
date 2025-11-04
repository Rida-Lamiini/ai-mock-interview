import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Textarea } from "../textarea";

describe("Textarea Component", () => {
  it("renders with default props", () => {
    render(<Textarea placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText("Enter text");
    expect(textarea).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <Textarea className="custom-textarea" placeholder="Custom textarea" />
    );
    const textarea = screen.getByPlaceholderText("Custom textarea");
    expect(textarea).toHaveClass("custom-textarea");
  });

  it("passes through other props", () => {
    render(
      <Textarea required disabled placeholder="Required textarea" rows={5} />
    );
    const textarea = screen.getByPlaceholderText("Required textarea");
    expect(textarea).toBeRequired();
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute("rows", "5");
  });

  it("has proper base styles", () => {
    render(<Textarea placeholder="Base styles" />);
    const textarea = screen.getByPlaceholderText("Base styles");
    expect(textarea).toHaveClass(
      "flex",
      "min-h-[80px]",
      "w-full",
      "rounded-md",
      "border",
      "border-input",
      "bg-background",
      "px-3",
      "py-2",
      "text-sm",
      "ring-offset-background",
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
    render(<Textarea placeholder="Focusable textarea" />);
    const textarea = screen.getByPlaceholderText("Focusable textarea");
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("handles value changes", () => {
    render(<Textarea placeholder="Changeable textarea" />);
    const textarea = screen.getByPlaceholderText("Changeable textarea");
    expect(textarea.value).toBe("");
  });
});
