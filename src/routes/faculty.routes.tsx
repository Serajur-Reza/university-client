import FacultyDashboard from "../pages/faculty/facultyDashboard";
import MyCourses from "../pages/faculty/myCourses";
import MyStudents from "../pages/faculty/myStudents";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "My Courses",
    path: "courses",
    element: <MyCourses />,
  },
  {
    path: "courses/:registrationSemesterId/:courseId",
    element: <MyStudents />,
  },
];
