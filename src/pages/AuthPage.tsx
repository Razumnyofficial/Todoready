import FullLogin from "@/components/FullLogin/FullLogin";
import myIlustr from "@/assets/Ilustr.png";
// import styles from "./AuthPage.module.css";

export const PageAuth = () => {
  return (
    <div >
      <div >
        <img src={myIlustr} alt="" />
        <FullLogin />
      </div>
    </div>
  );
};

export default PageAuth;
