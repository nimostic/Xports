import React from "react";
import { createBrowserRouter } from "react-router";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import AllContests from "../Pages/AllContests";
import ContestDetails from "../Pages/ContestDetails";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/Payment/PaymentCancelled";
import ManageContests from "../Pages/Dashboard/Creator/ManageContests";
import CreateContest from "../Pages/Dashboard/Creator/CreateContest";
import SubmittedTasks from "../Pages/Dashboard/Creator/SubmittedTasks";
import AdminManageContests from "../Pages/Dashboard/Admin/PendingContests";
import PendingContests from "../Pages/Dashboard/Admin/PendingContests";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import Profile from "../Pages/Dashboard/Common/Profile";
import ServiceSection from "../Pages/ServiceSection";
import FaqSection from "../Pages/FaqSection";

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
      {
        path: "our-service",
        Component: ServiceSection,
      },
      {
        path: "faq",
        Component: FaqSection,
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
        path: "profile", //admin
        Component: Profile,
      },
      {
        path: "pending-contests", //admin
        Component: PendingContests,
      },
      {
        path: "manage-users", //admin
        Component: ManageUsers,
      },
      {
        path: "create-contests",
        Component: CreateContest,
      },
      {
        path: "manage-contests", //creator
        Component: ManageContests,
      },
      {
        path: "submitted-tasks/:id",
        Component: SubmittedTasks,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled/:id",
        Component: PaymentCancel
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
