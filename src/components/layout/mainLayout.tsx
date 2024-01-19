import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";

const { Header, Content } = Layout;

// const items: MenuProps["items"] = [
//   {
//     key: "Dashboard",
//     label: <NavLink to="/admin/dashboard">Dashboard</NavLink>,
//   },
//   {
//     key: "2",
//     label: "Profile",
//   },

//   {
//     key: "3",
//     label: "User Management",
//     children: [
//       {
//         key: "Create Admin",
//         label: <NavLink to="/admin/create-admin">Create Admin</NavLink>,
//       },
//       {
//         key: "Create Student",
//         label: <NavLink to="/admin/create-student">Create Student</NavLink>,
//       },
//       {
//         key: "Create Faculty",
//         label: <NavLink to="/admin/create-faculty">Create Faculty</NavLink>,
//       },
//     ],
//   },
// ];

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header>
          <Button onClick={handleLogout}>Log Out</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default MainLayout;
