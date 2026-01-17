import React, { use } from "react";
import Loading from "../Components/Loading";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthContext";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  // console.log("private route",location);
  if (loading) {
    return <Loading></Loading>;
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location?.pathname} to='/login'></Navigate>
};

export default PrivateRoutes;
