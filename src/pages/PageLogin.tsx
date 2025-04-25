import LoginForm from "../components/LoginForm";
import styles from "../components/FullLogin/FullLogin.module.css";
import { Link } from "react-router-dom";

const PageLogin = () => {
  return (
  <>
  <LoginForm />
  <p className={styles.notregister}>
        Not registered yet? <Link to="/auth/register">Create an account</Link>
      </p>
  
  </>
  )
};

export default PageLogin;
