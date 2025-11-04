import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarImage, AvatarFallback } from "../avatar";

describe("Avatar Component", () => {
  it("renders Avatar root with default classes", () => {
    render(<Avatar data-testid="avatar">Avatar Content</Avatar>);
    const avatar = screen.getByTestId("avatar");
    expect(avatar).toHaveClass(
      "relative",
      "flex",
      "h-10",
      "w-10",
      "shrink-0",
      "overflow-hidden",
      "rounded-full"
    );
  });

  it("renders AvatarFallback when image fails to load", () => {
    render(
      <Avatar>
        <AvatarImage src="invalid.jpg" alt="Test Avatar" />
        <AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>
      </Avatar>
    );
    const fallback = screen.getByTestId("avatar-fallback");
    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveTextContent("JD");
  });

  it("applies custom className to Avatar", () => {
    render(
      <Avatar className="custom-avatar" data-testid="avatar">
        Content
      </Avatar>
    );
    const avatar = screen.getByTestId("avatar");
    expect(avatar).toHaveClass("custom-avatar");
  });

  it("renders AvatarImage with proper classes", () => {
    render(
      <Avatar>
        <AvatarImage
          src="test.jpg"
          alt="Test Avatar"
          data-testid="avatar-image"
        />
        <AvatarFallback>Fallback</AvatarFallback>
      </Avatar>
    );
    const image = screen.getByTestId("avatar-image");
    expect(image).toHaveClass("aspect-square", "h-full", "w-full");
    expect(image).toHaveAttribute("src", "test.jpg");
    expect(image).toHaveAttribute("alt", "Test Avatar");
  });

  it("renders AvatarFallback with proper classes", () => {
    render(
      <Avatar>
        <AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>
      </Avatar>
    );
    const fallback = screen.getByTestId("avatar-fallback");
    expect(fallback).toHaveClass(
      "flex",
      "h-full",
      "w-full",
      "items-center",
      "justify-center",
      "rounded-full",
      "bg-muted"
    );
    expect(fallback).toHaveTextContent("JD");
  });

  it("AvatarFallback applies custom className", () => {
    render(
      <Avatar>
        <AvatarFallback
          className="custom-fallback"
          data-testid="avatar-fallback"
        >
          AB
        </AvatarFallback>
      </Avatar>
    );
    const fallback = screen.getByTestId("avatar-fallback");
    expect(fallback).toHaveClass("custom-fallback");
  });

  it("AvatarImage applies custom className", () => {
    render(
      <Avatar>
        <AvatarImage className="custom-image" data-testid="avatar-image" />
        <AvatarFallback>Fallback</AvatarFallback>
      </Avatar>
    );
    const image = screen.getByTestId("avatar-image");
    expect(image).toHaveClass("custom-image");
  });

  it("passes through other props to Avatar", () => {
    render(
      <Avatar data-testid="avatar" id="test-avatar">
        Content
      </Avatar>
    );
    const avatar = screen.getByTestId("avatar");
    expect(avatar).toHaveAttribute("id", "test-avatar");
  });
});
