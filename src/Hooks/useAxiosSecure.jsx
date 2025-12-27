import axios from "axios";
import React, { use, useEffect } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { useNavigate } from "react-router";
const axiosSecure = axios.create({
  // baseURL: "https://xports-server.vercel.app",
  baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
  const { user, logOut } = use(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    //intercept request
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      // Do something before request is sent
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    //response
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const statusCode = error.status;
        
        if (statusCode === 401 || statusCode === 403) { 
          logOut().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      }
    );

    return () =>{
      axiosSecure.interceptors.request.eject(reqInterceptor)
      axiosSecure.interceptors.response.eject(resInterceptor)
    }
  }, [user,logOut,navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
