import { Layout, Menu } from "antd";

import { sideBarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { studentPaths } from "../../routes/student.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { useAppSelector } from "../../redux/hooks";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const user = useAppSelector((state) => state.auth.user);
  let sidebarItems;

  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = sideBarItemsGenerator(adminPaths, userRole.ADMIN);
      break;

    case userRole.FACULTY:
      sidebarItems = sideBarItemsGenerator(facultyPaths, userRole.FACULTY);
      break;

    case userRole.STUDENT:
      sidebarItems = sideBarItemsGenerator(studentPaths, userRole.STUDENT);
      break;

    default:
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>PH University</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
