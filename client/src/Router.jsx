import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import Account from "./components/Account";
import Settings from "./components/Settings";
import Pricing from "./components/Pricing";
import SidebarLayout from "./components/SidebarLayout";

export const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
    {
        element: <SidebarLayout />,
        children: [
            { path: "/homepage", element: <HomePage /> },
            { path: "/account", element: <Account /> },
            { path: "/settings", element: <Settings /> },
            { path: "/pricing", element: <Pricing /> }
        ]
    }
]);
