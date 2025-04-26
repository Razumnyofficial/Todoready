import ImginLogin from "../../assets/Ilustr.png";
// import styles from "./FullLogin.module.css";
import { Outlet } from "react-router-dom";
import { Typography, Image } from "antd";

const { Paragraph } = Typography;

const FullLogin = () => {
  return (
    <Typography style={{ display: "flex", height: "100%", width: "100%" }}>
      <Image src={ImginLogin} alt="login" />
      <Typography style={{ margin: "auto", textAlign: "center" }}>
        <Typography.Title level={1} style={{ paddingTop: 100, fontSize: 26, width: 376, height: 49, fontWeight: 700, color: "#525252" }}>Welcome to your Account</Typography.Title>
        <Paragraph style={{ paddingTop: 100, fontSize: 26, width: 376, height: 49, fontWeight: 700, color: "#525252" }}>We are glad to see you again</Paragraph>
        <Outlet />
      </Typography>
    </Typography>
  );
};

export default FullLogin;
