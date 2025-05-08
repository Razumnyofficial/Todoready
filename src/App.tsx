import { RouterProvider, createBrowserRouter } from "react-router-dom";

import PageTodo from "@/pages/TodoPage";

import ErrorPage from "@/pages/ErrorPage";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import "./App.css";
import FullLogin from "@/components/FullLogin/FullLogin";

import PageLogin from "@/pages/LoginPage";
import PageRegister from "@/pages/RegisterPage";
import ProfilePage from "@/pages/ProfilePage";
import SideMenuLayout from "@/layouts/SideMenuLayout";
import Users from "./pages/PageUsers";
import UserProfile from "./components/Users/UserProfile";

const router = createBrowserRouter([
  {
    path: "/", element: <FullLogin />, children: [
      { index: true, element: <PageLogin /> },
      { path: "register", element: <PageRegister /> },
    ]
  },
  {
    path: "/page",
    element: <SideMenuLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "tasks",
        element: (
          <PrivateRoute>
            <PageTodo />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "users",
        element: <Users />
      },
      {
        path: "users/:id",
        element: <UserProfile />
      }

    ],
  },



]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
