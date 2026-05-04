import Login from "@/layout/AuthLayout/auth/Login/Login";
import Register from "@/layout/AuthLayout/auth/Register/Register";
import AuthLayout from "@/layout/AuthLayout/AuthLayout";
import Profile from "@/layout/DashboardLayout/Dashboard/Profile/Profile";
import Dashboardlayout from "@/layout/DashboardLayout/Dashboardlayout";
import MainLayout from "@/layout/MainLayout/MainLayout";
import About from "@/pages/About/About";
import Blog from "@/pages/Blog/Blog";
import Home from "@/pages/Home/Home";
import Services from "@/pages/Services/Services";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "/services",
        Component: Services,
      },

      {
        path: "/about",
        element: (
          <PrivateRoute>
            <About />
          </PrivateRoute>
        ),
      },

      {
        path: "/blog",
        Component: Blog,
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

  {
    path: "/dashboard",
    Component: Dashboardlayout,
    children: [
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
]);
