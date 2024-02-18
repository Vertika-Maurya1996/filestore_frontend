import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import Header from "../components/Header";

const ProtectedRoutes = () => {
  let uID = localStorage.getItem("userID");
  if (!uID) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;
