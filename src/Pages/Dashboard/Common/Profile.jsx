import React, { use } from "react";
import { AuthContext } from "../../../Provider/AuthContext";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaRocket,
  FaTrophy,
  FaGamepad,
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useRole from "../../../Hooks/useRole";
import Loading from "../../../Components/Loading";

const Profile = () => {
  const { user, loading } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [role, status, isRoleLoading] = useRole();

  // Handle Creator Application
  const handleApplyCreator = async () => {
    try {
      const res = await axiosSecure.patch(`/users/apply-creator/${user.email}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Application sent! Wait for Admin approval.");
      } else {
        toast.info("You have already applied!");
      }
    } catch (err) {
      toast.error("Failed to send application.");
    }
  };
  console.log(role);
  if (loading || isRoleLoading) return <Loading />;

  return (
    <div className="bg-[#0a0a0a] min-h-screen p-6 md:p-10 text-white font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            My <span className="text-blue-500">Profile</span>
          </h1>
          <p className="text-gray-500 text-xs uppercase tracking-[0.3em] font-bold mt-2">
            Personal Identity & Credentials
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: User Identity Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#111] rounded-3xl border border-gray-800/50 p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-500"></div>

              {/* Profile Image */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-3xl ring-4 ring-blue-500/20 group-hover:ring-blue-500/50 transition-all overflow-hidden mb-6">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/mR79Y9t/user.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute bottom-4 right-0 bg-blue-500 p-2 rounded-xl border-4 border-[#111]">
                  <FaUserShield size={12} className="text-white" />
                </span>
              </div>

              <h2 className="text-2xl font-black text-gray-100 uppercase tracking-tight mb-1">
                {user?.displayName}
              </h2>
              <span className="px-4 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-500/20 mb-6">
                {role}
              </span>

              <div className="w-full space-y-4 pt-6 border-t border-gray-800/50 text-left">
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="p-3 bg-gray-800/50 rounded-xl">
                    <FaEnvelope size={14} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] uppercase font-bold text-gray-600">
                      Email Address
                    </p>
                    <p className="text-sm truncate font-medium">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stats & Creator Request */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#111] p-6 rounded-3xl border border-gray-800/50 flex items-center gap-6">
                <div className="p-4 bg-purple-500/10 text-purple-500 rounded-2xl border border-purple-500/20">
                  <FaTrophy size={24} />
                </div>
                <div>
                  <h3 className="text-3xl font-black italic">0</h3>
                  <p className="text-gray-500 text-xs uppercase font-bold tracking-widest">
                    Contests Won
                  </p>
                </div>
              </div>
              <div className="bg-[#111] p-6 rounded-3xl border border-gray-800/50 flex items-center gap-6">
                <div className="p-4 bg-blue-500/10 text-blue-500 rounded-2xl border border-blue-500/20">
                  <FaGamepad size={24} />
                </div>
                <div>
                  <h3 className="text-3xl font-black italic">0</h3>
                  <p className="text-gray-500 text-xs uppercase font-bold tracking-widest">
                    Participated
                  </p>
                </div>
              </div>
            </div>

            {/* Creator Application Section */}
            {role === "user" && (
              <div className="bg-[#111] rounded-3xl border border-blue-500/20 p-8 relative overflow-hidden group shadow-[0_20px_50px_rgba(37,99,235,0.05)]">
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                      Become a <span className="text-blue-500">Creator</span>
                    </h2>
                    <p className="text-gray-500 text-sm mt-2 max-w-sm">
                      Host your own contests and manage participants. Gain
                      control of your community today.
                    </p>
                  </div>

                  {status === "pending_creator" ? (
                    <button
                      disabled
                      className="px-8 py-4 bg-gray-800 text-gray-500 rounded-2xl font-black uppercase text-xs tracking-widest border border-gray-700 cursor-not-allowed flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
                      Request Pending
                    </button>
                  ) : (
                    <button
                      onClick={handleApplyCreator}
                      className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl active:scale-95"
                    >
                      <FaRocket />
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* If Already Admin/Creator */}
            {(role === "admin" || role === "creator") && (
              <div className="bg-green-500/5 border border-green-500/20 p-8 rounded-3xl text-center">
                <p className="text-green-400 font-bold uppercase text-xs tracking-[0.2em]">
                  You have full access as a{" "}
                  <span className="underline">{role}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
