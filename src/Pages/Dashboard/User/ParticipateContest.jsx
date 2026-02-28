import React, { use, useState } from "react";
import {
  Trophy,
  Clock,
  CheckCircle2,
  ChevronRight,
  Award,
  History,
} from "lucide-react";
import { AuthContext } from "../../../Provider/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import { Link, useNavigate } from "react-router";
const Participated = () => {
  const [activeTab, setActiveTab] = useState("participated");
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: participatedData = {}, isLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["participatedData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/participate?email=${user.email}`);
      return res.data;
    },
  });

  const { data: wonData = {} } = useQuery({
    enabled: !!user?.email,
    queryKey: ["winner", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/winners?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="bg-[#0a0a0a] min-h-screen p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl text-base-content uppercase italic tracking-tighter text-base-content">
              My <span className="text-red-600">Arena</span>
            </h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">
              Track your progress and victories
            </p>
          </div>

          <div className="flex bg-[#111] p-1.5 rounded-2xl border border-gray-800">
            <button
              onClick={() => setActiveTab("participated")}
              className={`px-6 py-2.5 rounded-xl text-xs text-base-content uppercase tracking-widest transition-all flex items-center gap-2 ${
                activeTab === "participated"
                  ? "bg-red-600 text-base-content shadow-lg"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <History size={14} /> Participated
            </button>
            <button
              onClick={() => setActiveTab("won")}
              className={`px-6 py-2.5 rounded-xl text-xs text-base-content uppercase tracking-widest transition-all flex items-center gap-2 ${
                activeTab === "won"
                  ? "bg-amber-500 text-base-content shadow-lg"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <Trophy size={14} /> Won
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 gap-4">
          {activeTab === "participated" ? (
            participatedData.length > 0 ? (
              participatedData.map((contest) => (
                <div
                  key={contest._id}
                  className="group bg-[#111] border border-gray-800/50 hover:border-gray-700 p-4 rounded-3xl flex flex-col md:flex-row items-center gap-6 transition-all"
                >
                  <div className="w-full md:w-40 h-24 rounded-2xl overflow-hidden">
                    <img
                      src={contest.bannerImage}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt=""
                    />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <p className="text-[10px] text-base-content text-red-600 uppercase tracking-widest mb-1">
                      {contest.contestType}
                    </p>
                    <h3 className="text-xl font-bold text-base-content">
                      {contest.contestName}
                    </h3>
                    <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-gray-500 text-xs">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {contest.paidAt}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-gray-400 italic font-mono text-sm">
                        ${contest.prizeMoney}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-gray-800 pt-4 md:pt-0">
                    <div
                      className={`px-4 py-2 rounded-xl text-[10px] text-base-content uppercase tracking-widest flex items-center gap-2 ${
                        contest.submissionStatus === "submitted"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-blue-500/10 text-blue-500"
                      }`}
                    >
                      {contest.submissionStatus === "submitted" ? (
                        <CheckCircle2 size={12} />
                      ) : (
                        <Clock size={12} />
                      )}
                      {contest.submissionStatus}
                    </div>
                    <Link to={`/contest-details/${contest.contestId}`}>
                      <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 text-gray-400 transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center py-20 italic">
                No participation history found.
              </p>
            )
          ) : wonData.length > 0 ? (
            wonData.map((contest) => (
              <div
                key={contest._id}
                onClick={() => navigate(`/contest-details/${contest._id}`)}
                className="relative cursor-pointer p-px bg-linear-to-r from-amber-500 via-yellow-200 to-amber-600 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.1)]"
              >
                <div className="bg-[#111] rounded-[23px] p-6 flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-500/20 shadow-2xl">
                      <img
                        src={contest.bannerImage}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                    <div className="absolute -top-3 -left-3 bg-amber-500 p-2 rounded-lg shadow-xl shadow-amber-900/50">
                      <Award size={18} className="text-base-content" />
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl text-base-content italic uppercase text-base-content leading-none">
                      {contest.contestName}
                    </h3>
                    <p className="text-amber-500/80 text-xs font-bold uppercase tracking-widest mt-2 flex items-center justify-center md:justify-start gap-2">
                      Winner Champion{" "}
                      <span className="w-1 h-1 rounded-full bg-amber-500"></span>{" "}
                      {contest.wonDate}
                    </p>
                  </div>

                  <div className="bg-amber-500/5 border border-amber-500/20 px-8 py-4 rounded-2xl text-center min-w-[150px]">
                    <p className="text-[10px] text-gray-500 uppercase text-base-content">
                      Prize Claimed
                    </p>
                    <p className="text-2xl text-base-content text-amber-500">
                      ${contest.prizeMoney}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center py-20 italic">
              Keep competing to win your first trophy!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Participated;
