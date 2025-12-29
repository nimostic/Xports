import React, { use } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = use(AuthContext);
  const { data: userData, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role`);
      return res.data;
    },
  });
  const role = userData?.role;
  const status = userData?.status;
  return [role, status, isRoleLoading];
};

export default useRole;
