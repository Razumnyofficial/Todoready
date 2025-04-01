import ImginLogin from "../../assets/inLogin.png";
import styles from "./FullLogin.module.css";
import LoginComponent from "../LoginComponent/LoginComponent";

const FullLogin = () => {
  return (
    <div className={styles.wrapper}>
      <img src={ImginLogin} alt="" />
      <div>
        <h1 className={styles.titlelogin}>Welcome to your Account</h1>
        <p className={styles.undertitle}>
          See what is going on wish ypor business
        </p>
      </div>
      <LoginComponent />
      <p className={styles.notregister}>
        Not Register Yet? <a href="">Create an account</a>
      </p>
    </div>
  );
};

export default FullLogin;
