import { RouterProvider, createBrowserRouter } from "react-router-dom";

import PageTodo from "./pages/PageTodo";
import PageAuth from "./pages/PageAuth";

import "./App.css";
import ErrorPage from "./pages/ErrorPage";
import RootLayout from "./pages/RootLayout";

// function App() {
//   return (
//     <>
//       <header>
//         <Link to="/">PageTodo </Link>
//         <Link to="/auth">PageAuth </Link>
//       </header>

//       <Routes>
//         <Route path="/" element={<PageTodo />} />
//         <Route path="/auth" element={<PageAuth />} />
//       </Routes>
//     </>
//   );
// }

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <PageTodo /> },
      { path: "/auth", element: <PageAuth /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
