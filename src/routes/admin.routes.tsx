import AdminDashboard from "../pages/admin/adminDashboard";
import CreateStudent from "../pages/admin/createStudent";
import CreateAdmin from "../pages/admin/createAdmin";
import CreateFaculty from "../pages/admin/createFaculty";
import AcademicSemester from "../pages/admin/academicSemesterManagement/academicSemester";

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
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
    ],
  },
];

// export const adminSideBarRoutes = adminPaths.reduce(
//   (acc: TSidebarRoute[], item) => {
//     if (item.path && item.name) {
//       acc.push({
//         key: item.name,
//         label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
//       });
//     }

//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: item.name,
//         children: item.children.map((child) => ({
//           key: item.name,
//           label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//         })),
//       });
//     }

//     return acc;
//   },
//   []
// );

// export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
//   if (item.path && item.element) {
//     acc.push({ path: item.path, element: item.element });
//   }

//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({ path: child.path, element: child.element });
//     });
//   }

//   return acc;
// }, []);

// export const adminRoutes = [
//   { index: true, element: <AdminDashboard /> },
//   { path: "dashboard", element: <AdminDashboard /> },
//   { path: "create-student", element: <CreateStudent /> },
//   { path: "create-admin", element: <CreateAdmin /> },
//   { path: "create-faculty", element: <CreateFaculty /> },
// ];
