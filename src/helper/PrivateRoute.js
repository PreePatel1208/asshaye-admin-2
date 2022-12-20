import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import LayoutCompo from "../pages/LayoutCompo";

const currentUser=()=>{
    if (typeof window == undefined) return false

    if (localStorage.getItem("userAuthToken")) return true;
    else return false
}
export default function PrivateRoute({ children }) {
  return currentUser() ?  <LayoutCompo><Outlet /></LayoutCompo> : <Navigate to="/auth/login" />;
}