import { RouterProvider, createBrowserRouter } from "react-router-dom";

import PageTodo from "./pages/PageTodo";

import ErrorPage from "./pages/ErrorPage";
// import RootLayout from "./pages/RootLayout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import "./App.css";
import FullLogin from "./components/FullLogin/FullLogin";

import PageLogin from "./pages/PageLogin";
import PageRegister from "./pages/PageRegister";
import ProfilePage from "./pages/ProfilePage";
import SideMenuLayout from "./pages/SideMenuLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SideMenuLayout />,
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
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      // {
      //   path: "/login",
      //   element: <FullLogin />,
      //   children: [{ index: true, element: <PageLogin /> }],
      // },
      // {
      //   path: "/register",
      //   element: <FullLogin />,
      //   children: [{ index: true, element: <PageRegister /> }],
      // },
    ],
  },

  {
    path: "/login",
    element: <FullLogin />,
    children: [{ index: true, element: <PageLogin /> }],
  },
  {
    path: "/register",
    element: <FullLogin />,
    children: [{ index: true, element: <PageRegister /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
