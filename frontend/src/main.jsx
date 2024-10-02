import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./auth/sign-in/index.jsx";
import Home from "./pages/home/index.jsx";
import Dashboard from "./pages/dashboard/index.jsx";
import ProtectedRoute from "./hooks/ProtectedRoute.jsx";
import Interview from "./pages/dashboard/interview/[interviewId]/index.jsx";
import StartInterview from "./pages/dashboard/interview/[interviewId]/startInterview/index.jsx";
import { Toaster } from "@/components/ui/sonner";
import Feedback from "./pages/dashboard/interview/[interviewId]/feedback/index.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />, // Home should be rendered at the root path
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute element={<Dashboard />} />,
      },
      {
        path: "/dashboard/interview/:interviewId",
        element: <Interview />,
      },
      {
        path: "/dashboard/interview/:interviewId/startInterview",
        element: <StartInterview />,
      },
      {
        path: "/dashboard/interview/:interviewId/feedback",
        element: <Feedback />,
      },
    ],
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
      <Toaster />
    </ClerkProvider>
  </React.StrictMode>
);
