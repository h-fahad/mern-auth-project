// src/routes.js
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard"; // Protected page example

const routes = [
  {
    path: "/login",
    component: Login,
    protected: false, // Public route
  },
  {
    path: "/signup",
    component: Signup,
    protected: false, // Public route
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    protected: false, // Public route
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    protected: false, // Public route
  },
  {
    path: "/dashboard",
    component: Dashboard,
    protected: true, // Requires authentication
  },
];

export default routes;
