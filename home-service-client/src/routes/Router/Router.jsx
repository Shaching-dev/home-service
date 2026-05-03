import Login from "@/layout/AuthLayout/auth/Login/Login";
import Register from "@/layout/AuthLayout/auth/Register/Register";
import AuthLayout from "@/layout/AuthLayout/AuthLayout";
import MainLayout from "@/layout/MainLayout/MainLayout";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },

  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
