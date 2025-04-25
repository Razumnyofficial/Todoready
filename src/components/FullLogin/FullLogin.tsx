import ImginLogin from "../../assets/Ilustr.png";
import styles from "./FullLogin.module.css";
import { Outlet, Link, useLocation } from "react-router-dom";

const FullLogin = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/auth/login";

  return (
    <div className={styles.wrapper}>
      <img src={ImginLogin} alt="login" />
      <div className={styles.login_and_register}>
        <h1 className={styles.titlelogin}>Welcome to your Account</h1>
        <p className={styles.undertitle}>We are glad to see you again</p>
        <Outlet />

        <p className={styles.notregister}>
          {isLoginPage ? (
            <>
              Not registered yet? <Link to="/auth/register">Create an account</Link>
            </>
          ) : (
            <>
              Already have an account? <Link to="/auth/login">Login</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default FullLogin;
