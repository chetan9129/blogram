import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/login";
export default function LoggedInRoute() {
  const { user } = useSelector((state) => ({ ...state }));

  return user ? <Outlet /> : <Login />;
}
