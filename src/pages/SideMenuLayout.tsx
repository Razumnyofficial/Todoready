import { Outlet } from "react-router-dom";

import useAuthCheck from "../hooks/useAuthCheck";
import SideMenu from "../components/SideMenu";

function SideMenuLayout() {
  useAuthCheck();

  return (
    <>
      <SideMenu />

      <Outlet />
    </>
  );
}

export default SideMenuLayout;
