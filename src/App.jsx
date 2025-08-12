import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./pages/Layout";
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/home/HomePage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";

const App = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await fetch("/api/v1/auth/me");
      const json = await res.json();
      if (!res.ok || !json.success) {
        if (res.status === 401) throw new Error("UNAUTHORIZED");
        throw new Error(json.message || json.error || "Failed to fetch user data");
      }
      return json;
    },
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const authUser = data?.user || null;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: authUser ? <HomePage /> : <Navigate to="/login" /> },
        { path: "/about", element: <div>About Page</div> },
        { path: "/signup", element: authUser ? <Navigate to="/" /> : <SignUpPage /> },
        { path: "/login", element: authUser ? <Navigate to="/" /> : <LoginPage /> },
        { path: "/notifications", element: authUser ? <NotificationPage /> : <Navigate to="/login" /> },
        { path: "/profile/:userName", element: authUser ? <ProfilePage /> : <Navigate to="/login" /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
