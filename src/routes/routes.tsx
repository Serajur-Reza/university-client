import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/about";
import Contact from "../pages/contact";
import Login from "../pages/login";
import Register from "../pages/register";

import { adminPaths } from "./admin.routes";
import { routesGenerator } from "../utils/routesGenerator";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import ProtectedRoute from "../components/layout/protectedRoute";
import ChangePassword from "../pages/changePassword";

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
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoute role="faculty">
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute role="student">
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(studentPaths),
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/change-password", element: <ChangePassword /> },
]);

export default router;
