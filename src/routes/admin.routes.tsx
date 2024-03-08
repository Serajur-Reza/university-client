import AdminDashboard from "../pages/admin/adminDashboard";
import CreateStudent from "../pages/admin/userManagement/createStudent";
import CreateAdmin from "../pages/admin/userManagement/createAdmin";
import CreateFaculty from "../pages/admin/userManagement/createFaculty";
import AcademicSemester from "../pages/admin/academicSemesterManagement/academicSemester";
import CreateAcademicSemester from "../pages/admin/academicSemesterManagement/createAcademicSemester";
import AcademicFaculty from "../pages/admin/academicFacultyManagement/academicFaculty";
import CreateAcademicFaculty from "../pages/admin/academicFacultyManagement/createAcademicFaculty";
import AcademicDepartment from "../pages/admin/academicDepartmentManagement/academicDepartment";
import CreateAcademicDepartment from "../pages/admin/academicDepartmentManagement/createAcademicDepartment";
import StudentData from "../pages/admin/userManagement/studentData";
import StudentDetails from "../pages/admin/userManagement/studentDetails";
import AdminData from "../pages/admin/userManagement/adminData";
import FacultiesData from "../pages/admin/userManagement/facultiesData";
import SemesterRegistration from "../pages/admin/courseManagement/semesterRegistration";
import RegisteredSemesters from "../pages/admin/courseManagement/registeredSemesters";
import Courses from "../pages/admin/courseManagement/courses";
import CreateCourse from "../pages/admin/courseManagement/createCourse";
import OfferCourse from "../pages/admin/courseManagement/offerCourse";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Admin Management",
    children: [
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create Academic Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },

      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create Academic Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },

      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
      {
        name: "Create Academic Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Students",
        path: "students-data",
        element: <StudentData />,
      },
      {
        path: "student-data/:studentId",
        element: <StudentDetails />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Admins",
        path: "admins-data",
        element: <AdminData />,
      },
      {
        path: "admin-data/:adminId",
        element: <AdminData />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Faculties",
        path: "faculties-data",
        element: <FacultiesData />,
      },
      {
        path: "faculty-data/:facultyId",
        element: <CreateFaculty />,
      },
    ],
  },

  {
    name: "Course Management",
    children: [
      {
        name: "Semester Registration",
        path: "semester-registration",
        element: <SemesterRegistration />,
      },
      {
        name: "Registered Semester",
        path: "registered-semester",
        element: <RegisteredSemesters />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "courses",
        element: <Courses />,
      },
      {
        name: "Offer Course",
        path: "offer-course",
        element: <OfferCourse />,
      },
      // {
      //   name: "Offered Courses",
      //   path: "offered-courses",
      //   element: <OfferedCourses />,
      // },
    ],
  },
];
