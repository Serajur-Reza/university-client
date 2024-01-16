import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/about";
import Contact from "../pages/contact";
import Login from "../pages/login";
import Register from "../pages/register";

import { adminRoutes } from "./admin.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },

  {
    path: "/admin",
    element: <App />,
    children: adminRoutes,
  },
  {
    path: "/faculty",
    element: <App />,
    children: adminRoutes,
  },
  {
    path: "/student",
    element: <App />,
    children: adminRoutes,
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
