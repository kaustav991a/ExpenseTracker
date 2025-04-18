import { createBrowserRouter } from "react-router-dom";
// import AppLayout from "./layouts/AppLayout"; // optional if you want a shared layout

import SplashScreen from "./pages/SplashScreen/SplashScreen";
import Onboarding from "./pages/Onboarding/Onboarding";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ConfirmSignup from "./pages/ConfirmSignup/ConfirmSignup";
import Home from "./pages/Home/Home";
import AddExpences from "./pages/AddExpences/AddExpences";
import EditExpenses from "./pages/EditExpences/EditExpences";
// import { useState } from "react";
import AppLayout from "./AppLayout";
import Profile from "./pages/Profile/Profile";
import Statistics from "./pages/Statistics/Statistics";
import AccountInfo from "./pages/AccountInfo/AccountInfo";

// const [transactions, setTransactions] = useState([]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // optional layout wrapper
    children: [
      {
        index: true,
        element: <SplashScreen />,
      },
      {
        path: "onboarding",
        element: <Onboarding />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "confirm-signup",
        element: <ConfirmSignup />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "add-expences",
        element: <AddExpences />,
      },
      {
        path: "edit-expense",
        element: <EditExpenses />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "account-info",
        element: <AccountInfo />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      // {
      //   path: "/transaction-details",
      //   element: <TransactionDetails />,
      // },
    ],
  },
]);

export default router;
