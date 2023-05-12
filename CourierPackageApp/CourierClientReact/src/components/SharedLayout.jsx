import { Outlet } from "react-router-dom";
import NavbarComp from "./Navbar";
const SharedLayout = () => {
  return (
    <>
      <NavbarComp />
      <Outlet />
    </>
  );
};

export default SharedLayout;
