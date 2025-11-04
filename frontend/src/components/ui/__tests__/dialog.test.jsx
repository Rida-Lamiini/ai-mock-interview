import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../dialog";

// Mock Radix UI Dialog
vi.mock("@radix-ui/react-dialog", () => ({
  Root: ({ children, ...props }) => (
    <div data-testid="dialog-root" {...props}>
      {children}
    </div>
  ),
  Trigger: ({ children, ...props }) => (
    <button data-testid="dialog-trigger" {...props}>
      {children}
    </button>
  ),
  Portal: ({ children }) => <div data-testid="dialog-portal">{children}</div>,
  Overlay: ({ className, ...props }) => (
    <div data-testid="dialog-overlay" className={className} {...props} />
  ),
  Content: ({ className, children, ...props }) => (
    <div data-testid="dialog-content" className={className} {...props}>
      {children}
    </div>
  ),
  Close: ({ children, ...props }) => (
    <button data-testid="dialog-close" {...props}>
      {children}
    </button>
  ),
  Title: ({ children, ...props }) => (
    <h2 data-testid="dialog-title" {...props}>
      {children}
    </h2>
  ),
  Description: ({ children, ...props }) => (
    <p data-testid="dialog-description" {...props}>
      {children}
    </p>
  ),
}));

describe("Dialog Components", () => {
  it("renders Dialog root", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByTestId("dialog-root")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-trigger")).toBeInTheDocument();
    expect(screen.getByText("Open Dialog")).toBeInTheDocument();
  });

  it("renders DialogContent with proper classes", () => {
    render(
      <Dialog open>
        <DialogContent data-testid="dialog-content">Content</DialogContent>
      </Dialog>
    );

    const content = screen.getByTestId("dialog-content");
    expect(content).toHaveClass(
      "fixed",
      "left-[50%]",
      "top-[50%]",
      "z-50",
      "grid",
      "w-full",
      "max-w-lg",
      "translate-x-[-50%]",
      "translate-y-[-50%]",
      "gap-4",
      "border",
      "bg-background",
      "p-6",
      "shadow-lg",
      "duration-200",
      "data-[state=open]:animate-in",
      "data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0",
      "data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95",
      "data-[state=open]:zoom-in-95",
      "data-[state=closed]:slide-out-to-left-1/2",
      "data-[state=closed]:slide-out-to-top-[48%]",
      "data-[state=open]:slide-in-from-left-1/2",
      "data-[state=open]:slide-in-from-top-[48%]",
      "sm:rounded-lg"
    );
  });

  it("renders DialogHeader with proper classes", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader data-testid="dialog-header">
            Header Content
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    const header = screen.getByTestId("dialog-header");
    expect(header).toHaveClass(
      "flex",
      "flex-col",
      "space-y-1.5",
      "text-center",
      "sm:text-left"
    );
  });

  it("renders DialogFooter with proper classes", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogFooter data-testid="dialog-footer">
            Footer Content
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const footer = screen.getByTestId("dialog-footer");
    expect(footer).toHaveClass(
      "flex",
      "flex-col-reverse",
      "sm:flex-row",
      "sm:justify-end",
      "sm:space-x-2"
    );
  });

  it("renders DialogTitle with proper classes", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Test Title</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    const title = screen.getByTestId("dialog-title");
    expect(title).toHaveClass(
      "text-lg",
      "font-semibold",
      "leading-none",
      "tracking-tight"
    );
  });

  it("renders DialogDescription with proper classes", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogDescription>Test Description</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    const description = screen.getByTestId("dialog-description");
    expect(description).toHaveClass("text-sm", "text-muted-foreground");
  });

  it("renders DialogClose with close button", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogClose data-testid="custom-close">×</DialogClose>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByTestId("custom-close")).toBeInTheDocument();
    expect(screen.getByText("×")).toBeInTheDocument();
  });
});
