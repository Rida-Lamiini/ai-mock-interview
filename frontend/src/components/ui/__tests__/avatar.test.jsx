import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarImage, AvatarFallback } from "../avatar";

// Mock Image constructor
// eslint-disable-next-line no-global-assign
global.Image = class MockImage {
  constructor() {
    // Simulate image loading
    setTimeout(() => {
      if (this.onload) this.onload();
    }, 0);
  }
};

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

  it("renders AvatarImage with proper classes", async () => {
    render(
      <Avatar>
        <AvatarImage
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
          alt="Test Avatar"
          data-testid="avatar-image"
        />
        <AvatarFallback>Fallback</AvatarFallback>
      </Avatar>
    );
    // Wait for the image to load
    const image = await screen.findByTestId("avatar-image");
    expect(image).toHaveClass("aspect-square", "h-full", "w-full");
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

  it("AvatarImage applies custom className", async () => {
    render(
      <Avatar>
        <AvatarImage
          className="custom-image"
          data-testid="avatar-image"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
        />
        <AvatarFallback>Fallback</AvatarFallback>
      </Avatar>
    );
    // Wait for the image to load
    const image = await screen.findByTestId("avatar-image");
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
