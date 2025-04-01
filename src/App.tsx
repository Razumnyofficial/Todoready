import { Routes, Route, Link } from "react-router-dom";

import PageTodo from "./pages/PageTodo";
import PageAuth from "./pages/PageAuth";

import "./app.css";

function App() {
  return (
    <>
      <header>
        <Link to="/">PageTodo </Link>
        <Link to="/auth">PageAuth </Link>
      </header>

      <Routes>
        <Route path="/" element={<PageTodo />} />
        <Route path="/auth" element={<PageAuth />} />
      </Routes>
    </>
  );
}

export default App;
