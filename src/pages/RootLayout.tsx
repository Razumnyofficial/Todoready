import { Outlet } from "react-router-dom";
import MainNavigation from "@/components/MainNavigation/MainNavigation";
import useAuthCheck from "@/hooks/useAuthCheck";

function RootLayout() {
  useAuthCheck();

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
