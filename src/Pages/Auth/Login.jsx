import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "./SocialLogin";
import { AuthContext } from "../../Provider/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const {signInUser} = use(AuthContext)
  const navigate = useNavigate();

  const handleSignUp = (data) => {
    signInUser(data.email,data.password)
    .then(result =>{
      console.log(result)
      navigate(location?.state || "/")
    })
    .catch(error =>{
      console.log(error);
    })
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign up to get started with our platform
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignUp)}>
          <div className="rounded-md space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                } placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:z-10 sm:text-sm transition-colors`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                    pattern: {
                      // Safe Regex: Checks for Uppercase, Lowercase, Number & Special Char
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/,
                      message:
                        "Must contain at least 1 uppercase, 1 lowercase, 1 number & 1 special char",
                    },
                  })}
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-indigo-500"
                  } placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:z-10 sm:text-sm transition-colors`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
                <button
                  onClick={handleShowPassword}
                  className="absolute top-3 right-4"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </div>
          <p>New to Program? <Link to="/register" state={location.state} className="text-blue-400">Register</Link></p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
