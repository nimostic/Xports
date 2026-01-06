import React from "react";
import useRole from "../../Hooks/useRole";
import Loading  from "../../Components/Loading";
import UserHome from './User/UserHome';
import CreatorHome from "./Creator/CreatorHome";
import AdminHome from "./Admin/AdminHome";
const DashboardHome = () => {
  const [role,status, isRoleLoading] = useRole();
  if (isRoleLoading) return <Loading></Loading>;
  return (
    <>
      <div className="p-6">
        {role === "admin" && <AdminHome></AdminHome>}
        {role === "creator" && <CreatorHome></CreatorHome>}
        {role === "user" && <UserHome></UserHome>}
      </div>
    </>
  );
};
export default DashboardHome;
