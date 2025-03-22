import { Routes, Route, Link } from "react-router-dom";

import Page from "./pages/Page";
import Profile from "./pages/Profile";

import "./app.css";

function App() {
  return (
    <>
      <header>
        <Link to="/">TodoList </Link>
        <Link to="/profile">Profile </Link>
      </header>

      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
