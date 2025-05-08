import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { User } from "@/types/usersTypes";
import { useEffect, useState } from "react";
import { getUser } from "@/api/auth";
import { Roles } from "@/types/usersTypes";

const { Sider } = Layout;

const SideMenu = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setCurrentUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

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
    ...(currentUser?.roles?.includes(Roles.ADMIN) ? [{
      key: "/users",
      label: <Link to="/users">Users</Link>
    }] : [])
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
