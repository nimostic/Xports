import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "./SocialLogin";
import { AuthContext } from "../../Provider/AuthContext";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
            role: 'user', // Default role
          };

          axiosSecure.post("/users", userInfo).then((res) => {
            // User created in DB
          });

          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          updateUserProfile(userProfile)
            .then(() => {
              toast.success("Registration Successful!");
              navigate(location.state || "/");
            })
            .catch((error) => toast.error(error.message));
        });
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="flex items-center justify-center bg-base-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 bg-base-200 p-8 rounded-2xl shadow-2xl border border-base-300">
        
        {/* Header Section */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-black italic uppercase tracking-tighter text-base-content">
            Create <span className="text-red-600">Account</span>
          </h2>
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-base-content/60">
            Join our platform to get started
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleRegistration)}>
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-base-content/70 mb-2">
                Full Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Full Name is required" })}
                className={`input input-bordered w-full bg-base-100 text-base-content focus:outline-red-600 ${errors.name ? "input-error" : ""}`}
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-[10px] text-error font-bold">{errors.name.message}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-base-content/70 mb-2">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
                })}
                className={`input input-bordered w-full bg-base-100 text-base-content focus:outline-red-600 ${errors.email ? "input-error" : ""}`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-[10px] text-error font-bold">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-base-content/70 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/,
                      message: "Needs Uppercase, Lowercase, Number & Special Char",
                    },
                  })}
                  className={`input input-bordered w-full bg-base-100 text-base-content focus:outline-red-600 ${errors.password ? "input-error" : ""}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}
                  className="absolute top-1/2 -translate-y-1/2 right-4 text-base-content/50 hover:text-red-600"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-[10px] text-error font-bold leading-tight">{errors.password.message}</p>}
            </div>

            {/* File Upload Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-base-content/70 mb-2">
                Profile Picture
              </label>
              <input
                type="file"
                {...register("photo", { required: "Profile picture is required" })}
                className="file-input file-input-bordered file-input-error w-full bg-base-100 text-base-content text-xs"
              />
              {errors.photo && <p className="mt-1 text-[10px] text-error font-bold">{errors.photo.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-block bg-red-600 border-none hover:bg-red-700 text-white font-black italic uppercase tracking-tighter"
          >
            Register
          </button>

          <p className="text-center text-xs font-medium text-base-content/60 uppercase tracking-wide">
            Already Have an Account?{" "}
            <Link to="/login" className="text-red-600 font-black hover:underline ml-1">
              Login
            </Link>
          </p>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-base-300"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
            <span className="px-4 bg-base-200 text-base-content/40">Or register with</span>
          </div>
        </div>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;