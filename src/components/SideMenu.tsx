import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

const SideMenu = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: "/",
      label: (
        <Link to="/" >
          Tasks
        </Link>
      ),
    },
    {
      key: "/profile",
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "/users",
      label: <Link to="/users">Users</Link>
    }
  ];

  return (
    <Sider style={{ backgroundColor: "#fff" }}>
      <div
        style={{
          padding: "16px",
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        SideMenu
      </div>

      <Menu selectedKeys={[location.pathname]} items={menuItems} />
    </Sider>
  );
};

export default SideMenu;
