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

  const { data: participatedData = [], isLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["participatedData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/participate?email=${user.email}`);
      return res.data;
    },
  });

  const { data: wonData = [] } = useQuery({
    enabled: !!user?.email,
    queryKey: ["winner", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/winners?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="bg-base-100 min-h-screen p-4 md:p-10 text-base-content transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-base-content">
              My <span className="text-red-600">Arena</span>
            </h1>
            <p className="text-base-content/50 text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic border-l-2 border-red-600 pl-4">
              Track your progress and victories
            </p>
          </div>

          <div className="flex bg-base-200 dark:bg-[#111] p-1.5 rounded-2xl border border-base-300 dark:border-white/5 shadow-inner">
            <button
              onClick={() => setActiveTab("participated")}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                activeTab === "participated"
                  ? "bg-red-600 text-white shadow-lg shadow-red-900/20"
                  : "text-base-content/40 hover:text-base-content"
              }`}
            >
              <History size={14} /> Participated
            </button>
            <button
              onClick={() => setActiveTab("won")}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                activeTab === "won"
                  ? "bg-amber-500 text-white shadow-lg shadow-amber-900/20"
                  : "text-base-content/40 hover:text-base-content"
              }`}
            >
              <Trophy size={14} /> Won
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 gap-6">
          {activeTab === "participated" ? (
            participatedData.length > 0 ? (
              participatedData.map((contest) => (
                <div
                  key={contest._id}
                  className="group bg-base-200/50 dark:bg-[#111] border border-base-300 dark:border-white/5 hover:border-red-600/30 p-5 rounded-4xl flex flex-col md:flex-row items-center gap-6 transition-all shadow-sm hover:shadow-xl"
                >
                  <div className="w-full md:w-44 h-28 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={contest.bannerImage}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={contest.contestName}
                    />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <p className="text-[9px] font-black text-red-600 uppercase tracking-[0.2em] mb-2 italic">
                      {contest.contestType}
                    </p>
                    <h3 className="text-xl font-black italic uppercase tracking-tight text-base-content">
                      {contest.contestName}
                    </h3>
                    <div className="flex items-center justify-center md:justify-start gap-4 mt-3 text-base-content/50 text-[10px] font-bold">
                      <span className="flex items-center gap-1 bg-base-300 dark:bg-white/5 px-3 py-1 rounded-full italic">
                        <Clock size={10} /> {contest.paidAt}
                      </span>
                      <span className="text-red-600 dark:text-red-500 italic font-black text-sm">
                        ${contest.prizeMoney}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-base-300 dark:border-white/5 pt-4 md:pt-0">
                    <div
                      className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 italic ${
                        contest.submissionStatus === "submitted"
                          ? "bg-green-500/10 text-green-600 dark:text-green-500 border border-green-500/20"
                          : "bg-blue-500/10 text-blue-600 dark:text-blue-500 border border-blue-500/20"
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
                      <button className="p-4 bg-base-300 dark:bg-white/5 rounded-2xl hover:bg-red-600 hover:text-white text-base-content transition-all active:scale-90">
                        <ChevronRight size={18} />
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-24 bg-base-200/30 rounded-[3rem] border-2 border-dashed border-base-300 dark:border-white/5">
                <History size={40} className="mx-auto mb-4 opacity-10" />
                <p className="text-base-content/40 font-black uppercase tracking-widest text-xs italic">
                    No participation history found in the arena.
                </p>
              </div>
            )
          ) : wonData.length > 0 ? (
            wonData.map((contest) => (
              <div
                key={contest._id}
                onClick={() => navigate(`/contest-details/${contest._id}`)}
                className="relative cursor-pointer p-[1.5px] bg-linear-to-r from-amber-500 via-yellow-200 to-amber-600 rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-amber-500/20 transition-all active:scale-[0.98]"
              >
                <div className="bg-base-200 dark:bg-[#0d0d0d] rounded-[2.4rem] p-6 flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl">
                      <img
                        src={contest.bannerImage}
                        className="w-full h-full object-cover"
                        alt={contest.contestName}
                      />
                    </div>
                    <div className="absolute -top-3 -left-3 bg-amber-500 text-white p-2.5 rounded-xl shadow-xl shadow-amber-900/40">
                      <Award size={20} />
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-base-content leading-none mb-3">
                      {contest.contestName}
                    </h3>
                    <div className="flex items-center justify-center md:justify-start gap-2 bg-amber-500/10 w-fit px-4 py-1 rounded-full mx-auto md:mx-0">
                        <Trophy size={12} className="text-amber-500" />
                        <p className="text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest italic">
                        Winner Champion — {contest.wonDate}
                        </p>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 px-10 py-5 rounded-3xl text-center min-w-[180px] shadow-inner">
                    <p className="text-[9px] font-black text-base-content/40 uppercase tracking-[0.2em] mb-1 italic">
                      Prize Claimed
                    </p>
                    <p className="text-3xl font-black italic text-amber-600 dark:text-amber-500">
                      ${contest.prizeMoney}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 bg-base-200/30 rounded-[3rem] border-2 border-dashed border-base-300 dark:border-white/5">
                <Trophy size={40} className="mx-auto mb-4 opacity-10 text-amber-500" />
                <p className="text-base-content/40 font-black uppercase tracking-widest text-xs italic px-6">
                    The podium is waiting. Compete to win your first trophy!
                </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Participated;