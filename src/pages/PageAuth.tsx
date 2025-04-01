import "./profile.css";
import FullLogin from "../components/FullLogin/FullLogin";
import myIlustr from "../assets/Ilustr.png";
import styles from "./Page.module.css";

export const PageAuth = () => {
  return (
    <div className={styles.App}>
      <div className={styles.wrapper}>
        <img src={myIlustr} alt="" />
        <FullLogin />
      </div>
    </div>
  );
};

export default PageAuth;
