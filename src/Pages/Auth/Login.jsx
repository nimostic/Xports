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
        if (!value) return "You need to write your email!";
      },
    });

    if (email) {
      userPasswordReset(email)
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "Password reset email sent!",
            icon: "success",
            confirmButtonColor: "#dc2626",
            background: "oklch(var(--b1))",
            color: "oklch(var(--bc))",
          });
        })
        .catch((error) => toast.error(error.message));
    }
  };

  return (
    <div className="flex items-center justify-center bg-base-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 bg-base-200 p-8 rounded-2xl shadow-2xl border border-base-300">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-black italic uppercase tracking-tighter text-base-content">
            Welcome <span className="text-red-600">Back</span>
          </h2>
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-base-content/60">
            Login to access your dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignUp)}>
          <div className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-base-content/70 mb-2">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
                className={`input input-bordered w-full bg-base-100 text-base-content focus:outline-red-600 ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-[10px] text-error font-bold">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-base-content/70 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Password required" })}
                  className={`input input-bordered w-full bg-base-100 text-base-content focus:outline-red-600 ${
                    errors.password ? "input-error" : ""
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-4 text-base-content/50 hover:text-red-600"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-[10px] text-error font-bold">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={handlePasswordReset}
              className="text-xs font-bold uppercase tracking-tight text-red-600 hover:text-red-500 transition-colors underline decoration-dotted"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-block bg-red-600 border-none hover:bg-red-700 text-white font-black italic uppercase tracking-tighter"
          >
            Login
          </button>

          <p className="text-center text-xs font-medium text-base-content/60 uppercase tracking-wide">
            New to Platform?{" "}
            <Link
              to="/register"
              state={location?.state}
              className="text-red-600 font-black hover:underline ml-1"
            >
              Register Now
            </Link>
          </p>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-base-300"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
            <span className="px-4 bg-base-200 text-base-content/40">
              Or continue with
            </span>
          </div>
        </div>

        <SocialLogin from={location?.state} />
      </div>
    </div>
  );
};

export default Login;
