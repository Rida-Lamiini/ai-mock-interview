import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { MobileNav } from "../mobile-nav";
import { renderWithProviders } from "../../../test/utils";

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  Home: () => <svg data-testid="home-icon">Home</svg>,
  MessageSquare: () => (
    <svg data-testid="message-square-icon">MessageSquare</svg>
  ),
  Star: () => <svg data-testid="star-icon">Star</svg>,
  HelpCircle: () => <svg data-testid="help-circle-icon">HelpCircle</svg>,
  User: () => <svg data-testid="user-icon">User</svg>,
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

// Mock react-router-dom
const mockLocation = { pathname: "/" };
vi.mock("react-router-dom", () => ({
  Link: ({ children, to, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  useLocation: () => mockLocation,
  useNavigate: () => vi.fn(),
}));

describe("MobileNav Component", () => {
  it("does not render when user is not signed in", () => {
    renderWithProviders(<MobileNav isSignedIn={false} />);
    expect(screen.queryByTestId("home-icon")).not.toBeInTheDocument();
  });

  it("renders navigation items when user is signed in", () => {
    renderWithProviders(<MobileNav isSignedIn={true} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Questions")).toBeInTheDocument();
    expect(screen.getByText("Upgrade")).toBeInTheDocument();
    expect(screen.getByText("Help")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("renders all navigation icons", () => {
    renderWithProviders(<MobileNav isSignedIn={true} />);
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
    expect(screen.getByTestId("message-square-icon")).toBeInTheDocument();
    expect(screen.getByTestId("star-icon")).toBeInTheDocument();
    expect(screen.getByTestId("help-circle-icon")).toBeInTheDocument();
    expect(screen.getByTestId("user-icon")).toBeInTheDocument();
  });

  it("applies active styles to current route", () => {
    mockLocation.pathname = "/dashboard";
    renderWithProviders(<MobileNav isSignedIn={true} />);

    const dashboardLink = screen.getByText("Dashboard").closest("a");
    expect(dashboardLink).toHaveClass(
      "bg-blue-100",
      "dark:bg-blue-900",
      "text-blue-600",
      "dark:text-blue-400"
    );
  });

  it("applies inactive styles to non-active routes", () => {
    mockLocation.pathname = "/dashboard";
    renderWithProviders(<MobileNav isSignedIn={true} />);

    const questionsLink = screen.getByText("Questions").closest("a");
    expect(questionsLink).toHaveClass("text-gray-500", "dark:text-gray-400");
  });

  it("has proper fixed positioning", () => {
    renderWithProviders(<MobileNav isSignedIn={true} />);
    const nav = document.querySelector("div");
    expect(nav).toHaveClass(
      "fixed",
      "bottom-0",
      "left-0",
      "right-0",
      "bg-white",
      "dark:bg-gray-900",
      "border-t",
      "z-50",
      "md:hidden"
    );
  });

  it("includes proper flex layout", () => {
    renderWithProviders(<MobileNav isSignedIn={true} />);
    const container = document.querySelector(".flex");
    expect(container).toHaveClass("items-center", "justify-around", "py-2");
  });

  it("renders links with proper navigation paths", () => {
    renderWithProviders(<MobileNav isSignedIn={true} />);
    const dashboardLink = screen.getByText("Dashboard").closest("a");
    expect(dashboardLink).toHaveAttribute("href", "/dashboard");

    const questionsLink = screen.getByText("Questions").closest("a");
    expect(questionsLink).toHaveAttribute("href", "/question");

    const upgradeLink = screen.getByText("Upgrade").closest("a");
    expect(upgradeLink).toHaveAttribute("href", "/upgrade");
  });

  it("includes proper spacing and sizing classes", () => {
    renderWithProviders(<MobileNav isSignedIn={true} />);
    const navItems = document.querySelectorAll(".min-w-0");
    expect(navItems.length).toBe(5); // 5 navigation items
  });

  it("has proper responsive design (hidden on md and up)", () => {
    renderWithProviders(<MobileNav isSignedIn={true} />);
    const nav = document.querySelector("div");
    expect(nav).toHaveClass("md:hidden");
  });
});
