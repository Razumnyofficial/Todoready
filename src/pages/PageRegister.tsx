import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";
import styles from "../components/FullLogin/FullLogin.module.css";

const PageRegister = () => {
  return (
    <>
      <RegisterForm />
      <p className={styles.notregister}>
        Already have an account? <Link to="/auth/login">Login</Link>
      </p>
    </>
  );
};

export default PageRegister;