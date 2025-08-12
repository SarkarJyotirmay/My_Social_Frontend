import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./pages/Layout";
import SignUpPage from "./pages/auth/SignUpPage"
import LoginPage from "./pages/auth/LoginPage"
import HomePage from "./pages/home/HomePage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: "/about",
          element: <div>About Page</div>
        },
        {
          path: "/signup",
          element: <SignUpPage />
        },
        {
          path: "/login",
          element: <LoginPage />
        },
        {
          path: "/notifications",
          element: <NotificationPage />
        },
        {
          path: "/profile",
          element: <ProfilePage />
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
