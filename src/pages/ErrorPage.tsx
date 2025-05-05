import { Link } from "react-router-dom";


function ErrorPage() {
  return (
    <>
      
      <main style={{ display: "block", textAlign: "center", padding: "20%" ,}}>
        <h1>404 Not Found</h1>
        <button style={{ padding: "20px" }}>
          <Link to="/auth/login" style={{ marginLeft: 0 }}>
            Авторизируйся
          </Link>
        </button>
      </main>
    </>
  );
}

export default ErrorPage;
