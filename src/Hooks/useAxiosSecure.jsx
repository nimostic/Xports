import axios from "axios";
import React from "react";
const axiosSecure = axios.create({
  // baseURL: "https://xports-server.vercel.app",
  baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
