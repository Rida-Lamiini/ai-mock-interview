import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { vi } from "vitest";

// Mock Clerk
vi.mock("@clerk/clerk-react", () => {
  return {
    ClerkProvider: ({ children }) => children,
    useUser: () => ({
      isSignedIn: false,
      user: null,
    }),
    UserButton: () => <button>User</button>,
  };
});

// Custom render function that includes providers
export function renderWithProviders(ui, options = {}) {
  return render(ui, {
    wrapper: ({ children }) => (
      <ClerkProvider publishableKey="pk_test_mock-key">
        <BrowserRouter>{children}</BrowserRouter>
      </ClerkProvider>
    ),
    ...options,
  });
}

// Helper to wait for animations to complete
export const waitForAnimations = () =>
  new Promise((resolve) => setTimeout(resolve, 300));
