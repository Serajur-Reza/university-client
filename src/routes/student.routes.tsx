import MySchedule from "../pages/student/mySchedule";
import OfferedCourse from "../pages/student/offeredCourse";
import StudentDashboard from "../pages/student/studentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },

  {
    name: "Offered-Course",
    path: "offered-course",
    element: <OfferedCourse />,
  },

  {
    name: "My Schedule",
    path: "schedule",
    element: <MySchedule />,
  },
];
