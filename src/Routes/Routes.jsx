import React from "react";
import { createBrowserRouter } from "react-router";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import CreateContest from "../Pages/Dashboard/CreateContest";
import AllContests from "../Pages/AllContests";
import ContestDetails from "../Pages/ContestDetails";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-contests",
        Component: AllContests,
      },
      {
        path: "contest-details/:id",
        Component: ContestDetails,
      },

    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "create-contests",
        Component: CreateContest,
      },{
        path:"payment-success",
        Component : PaymentSuccess
      },
    ],
  },
  {
    path: "/",
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
