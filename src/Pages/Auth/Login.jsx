import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "./SocialLogin";
import { AuthContext } from "../../Provider/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const { signInUser, userPasswordReset } = use(AuthContext);
  const navigate = useNavigate();

  // Login Logic
  const handleSignUp = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        toast.success("Login Successful!");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Forget Password Logic 
  const handlePasswordReset = async () => {
    const { value: email } = await Swal.fire({
      title: "Reset Password",
      text: "Enter your email address to receive a reset link",
      input: "email",
      inputPlaceholder: "you@example.com",
      showCancelButton: true,
      confirmButtonText: "Send Link",
      confirmButtonColor: "#dc2626", 
      background: "#fff",
      color: "#000",
      inputValidator: (value) => {
        if (!value) {
          return "You need to write your email!";
        }
      }
    });

    if (email) {
      userPasswordReset(email)
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "Password reset email sent! Check your inbox.",
            icon: "success",
            confirmButtonColor: "#dc2626",
          });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Login to access your dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignUp)}>
          <div className="rounded-md space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
                } placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:z-10 sm:text-sm transition-colors`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                  })}
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
                  } placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:z-10 sm:text-sm transition-colors`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute top-3 right-4 text-gray-500"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>
          </div>

          {/* Forget Password Link */}
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={handlePasswordReset}
              className="text-sm font-medium text-red-600 hover:text-red-500 transition-colors underline decoration-dotted"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            New to Platform?{" "}
            <Link to="/register" state={location?.state} className="text-red-600 font-bold hover:underline">
              Register Now
            </Link>
          </p>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
        </div>

        <SocialLogin from={location?.state}></SocialLogin>
      </div>
    </div>
  );
};

export default Login;