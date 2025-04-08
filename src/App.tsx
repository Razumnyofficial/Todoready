import { RouterProvider, createBrowserRouter } from "react-router-dom";

import PageTodo from "./pages/PageTodo";
import PageAuth from "./pages/PageAuth";
import ErrorPage from "./pages/ErrorPage";
import RootLayout from "./pages/RootLayout";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <PageTodo />
          </PrivateRoute>
        ),
      },
      { path: "/auth", element: <PageAuth /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
