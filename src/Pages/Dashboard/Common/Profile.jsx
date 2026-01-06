import React, { use, useRef, useState } from "react";
import { AuthContext } from "../../../Provider/AuthContext";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaRocket,
  FaTrophy,
  FaGamepad,
  FaTimes,
  FaCloudUploadAlt,
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useRole from "../../../Hooks/useRole";
import Loading from "../../../Components/Loading";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { user, loading, updateUserProfile } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [role, status, isRoleLoading] = useRole();
  const modalRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle Image Preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const {data:wonData={}} = useQuery({
    enabled:!!user?.email,
    queryKey:["wonData",user?.email],
    queryFn: async ()=>{
      const res = await axiosSecure.get(`/winners?email=${user.email}`)
      return res.data
    }
  })
  const {data:participateData={}} = useQuery({
    enabled:!!user?.email,
    queryKey:["participateData",user?.email],
    queryFn: async ()=>{
      const res = await axiosSecure.get(`/participate?email=${user.email}`)
      return res.data
    }
  })

  console.log(wonData.length);
  console.log(participateData.length);


  const updatedDetails = async (data) => {
    setIsUpdating(true);
    try {
      const profileImg = data.photo[0];
      let imgbbURL = user?.photoURL;

      if (profileImg) {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        const res = await axios.post(image_API_URL, formData);
        imgbbURL = res.data.data.url;
      }

      await updateUserProfile({
        displayName: data.name,
        photoURL: imgbbURL,
      });

      toast.success("Profile Updated Successfully!");
      modalRef.current.close();
      reset();
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleApplyCreator = async () => {
    try {
      const res = await axiosSecure.patch(`/users/apply-creator/${user.email}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Application sent! Wait for Admin approval.");
      } else {
        toast.info("You already have a pending request.");
      }
    } catch (err) {
      toast.error("Failed to send application.");
    }
  };

  if (loading || isRoleLoading) return <Loading />;

  return (
    <div className="bg-[#0a0a0a] min-h-screen p-4 md:p-10 text-white selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
              Account <span className="text-blue-600">Central</span>
            </h1>
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] font-bold mt-3 border-l-2 border-blue-600 pl-4">
              Profile Management & Stats
            </p>
          </div>
          <button
            onClick={() => modalRef.current.showModal()}
            className="group relative px-8 py-3 bg-white text-black font-black uppercase text-xs tracking-widest rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaUser size={10} /> Edit Profile
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Identity Card */}
          <div className="lg:col-span-4">
            <div className="bg-[#111] rounded-4xl border border-white/5 p-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600 to-purple-600"></div>

              <div className="relative flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden ring-1 ring-white/10 p-2 bg-white/5 shadow-2xl">
                    <img
                      src={
                        user?.photoURL || "https://i.ibb.co/mR79Y9t/user.png"
                      }
                      className="w-full h-full object-cover rounded-4xl group-hover:scale-110 transition-transform duration-700"
                      alt="Avatar"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 p-3 rounded-2xl shadow-xl border-4 border-[#111]">
                    <FaUserShield size={16} />
                  </div>
                </div>

                <h2 className="text-3xl font-black italic uppercase tracking-tight text-white mb-1">
                  {user?.displayName}
                </h2>
                <div className="flex items-center gap-2 mb-8">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/80">
                    {role} Level Account
                  </span>
                </div>

                <div className="w-full p-5 bg-black/40 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-600/10 rounded-lg text-blue-500">
                      <FaEnvelope size={12} />
                    </div>
                    <div className="truncate">
                      <p className="text-[8px] uppercase font-bold text-gray-500 tracking-widest">
                        Email Address
                      </p>
                      <p className="text-xs font-medium truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111] p-8 rounded-4xl border border-white/5 flex items-center justify-between group">
                <div>
                  <h3 className="text-5xl font-black italic mb-2 tracking-tighter">
                    {wonData.length}
                  </h3>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em]">
                    Contests Won
                  </p>
                </div>
                <div className="p-5 rounded-3xl bg-amber-500/10 text-amber-500 group-hover:rotate-12 transition-transform">
                  <FaTrophy size={24} />
                </div>
              </div>

              <div className="bg-[#111] p-8 rounded-4xl border border-white/5 flex items-center justify-between group">
                <div>
                  <h3 className="text-5xl font-black italic mb-2 tracking-tighter">
                    {participateData.length}
                  </h3>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em]">
                    Participated
                  </p>
                </div>
                <div className="p-5 rounded-3xl bg-blue-500/10 text-blue-500 group-hover:rotate-12 transition-transform">
                  <FaGamepad size={24} />
                </div>
              </div>
            </div>

            {/* Creator Application */}
            {role === "user" && (
              <div className="relative bg-[#111] rounded-[2.5rem] p-10 border border-blue-500/20 shadow-[0_0_100px_rgba(37,99,235,0.05)] overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px]"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                  <div className="text-center md:text-left flex-1">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">
                      Ascend to <span className="text-blue-500">Creator</span>
                    </h2>

                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                      Join the elite circle. Start hosting your own challenges,
                      set prize pools, and lead your community.
                    </p>
                  </div>

                  {status === "pending_creator" ? (
                    <div className="px-10 py-5 bg-black/50 border border-white/5 rounded-4xl flex flex-col items-center">
                      <div className="w-10 h-1 bg-amber-500/30 rounded-full mb-3 overflow-hidden">
                        <div className="w-1/2 h-full bg-amber-500 animate-slide"></div>
                      </div>

                      <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest anianimate-slide">
                        Approval Pending
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={handleApplyCreator}
                      className="px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl shadow-blue-900/40 transition-all active:scale-95 flex items-center gap-4 group"
                    >
                      Apply for Access
                      <FaRocket className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {(role === "admin" || role === "creator") && (
              <div className="p-8 rounded-4xl bg-linear-to-r from-green-500/10 to-transparent border border-green-500/20 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-500">
                  <FaUserShield size={20} />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-green-500">
                    Privileged Access
                  </p>

                  <p className="text-gray-400 text-xs">
                    You are currently operating as an authorized {role}.
                  </p>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>

      {/* --- MODAL WITH PREVIEW --- */}
      <dialog
        ref={modalRef}
        className="modal modal-bottom sm:modal-middle backdrop-blur-md"
      >
        <div className="modal-box bg-[#0f0f0f] border border-white/10 rounded-[2.5rem] p-0 overflow-hidden max-w-md shadow-2xl">
          <div className="bg-blue-600 p-8 flex justify-between items-center relative">
            <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter">
              Identity Settings
            </h3>
            <form method="dialog">
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <FaTimes />
              </button>
            </form>
          </div>

          <form
            onSubmit={handleSubmit(updatedDetails)}
            className="p-8 space-y-6"
          >
            {/* Name Input */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">
                Account Display Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  {...register("name", { required: "Name is required" })}
                  className="w-full bg-black border border-white/10 rounded-2xl p-4 pl-12 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-gray-700"
                />
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
              </div>
              {errors.name && (
                <p className="text-red-500 text-[10px] mt-2 font-bold uppercase">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Photo Input & Preview */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">
                Profile Avatar
              </label>
              <label className="group relative flex flex-col items-center justify-center w-full min-h-[140px] bg-black border-2 border-dashed border-white/10 rounded-2xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer overflow-hidden">
                {imagePreview ? (
                  <div className="flex flex-col items-center p-4 animate-in fade-in zoom-in duration-300">
                    <img
                      src={imagePreview}
                      className="w-20 h-20 object-cover rounded-2xl mb-2 ring-2 ring-blue-500 p-1 bg-black"
                      alt="Preview"
                    />
                    <span className="text-[10px] font-black uppercase text-blue-500">
                      Replace Selected Photo
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6">
                    <FaCloudUploadAlt className="text-3xl text-gray-600 group-hover:text-blue-500 transition-colors mb-2" />
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                      Select Image File
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  {...register("photo")}
                  onChange={(e) => {
                    register("photo").onChange(e);
                    handleFileChange(e);
                  }}
                />
              </label>
            </div>

            <button
              disabled={isUpdating}
              type="submit"
              className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl transition-all flex items-center justify-center gap-2 ${
                isUpdating
                  ? "bg-gray-800 text-gray-500"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              {isUpdating ? "Synchronizing..." : "Save Changes"}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
