import { useQuery } from "@tanstack/react-query";
import React, { use, useState } from "react";
import { FaEdit, FaTrash, FaEye, FaUsers, FaTrophy } from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import Swal from "sweetalert2";
import UpdateContest from "./UpdateContest";
import { Link } from "react-router";

const ManageContests = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [selectedContest, setSelectedContest] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: myContests = [], isLoading, refetch } = useQuery({
    queryKey: ["myContests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-contests?email=${user.email}`);
      return res.data;
    },
  });

  const confirmedCount = myContests.filter((c) => c.status === "confirmed").length;

  const handleDeleteContest = (id) => {
    Swal.fire({
      title: "EXTERMINATE?",
      text: "This contest will be removed from the arena!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F40E08",
      cancelButtonColor: "#111",
      confirmButtonText: "YES, DELETE",
      background: "#0a0a0a",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/contests/${id}?email=${user.email}`).then((res) => {
          if (res.data.deletedCount || res.status === 200) {
            refetch();
            Swal.fire({ title: "DELETED", icon: "success", background: "#0a0a0a", color: "#fff" });
          }
        });
      }
    });
  };

  const handleEditContest = (contest) => {
    setSelectedContest(contest);
    setIsOpen(true);
  };

  return (
    <div className="bg-base-100 min-h-screen p-4 md:p-10 text-base-content">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* Header & Stats Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
                My <span className="text-primary">Arenas</span>
              </h1>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] opacity-40 mt-4 italic">
                Tournament Command Center
              </p>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-base-200/50 backdrop-blur-sm border border-white/5 px-8 py-4 rounded-2xl text-center min-w-[140px]">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1 italic">Total Hosted</p>
                <p className="text-2xl font-black italic text-primary">{myContests.length}</p>
              </div>
              <div className="bg-base-200/50 backdrop-blur-sm border border-white/5 px-8 py-4 rounded-2xl text-center min-w-[140px]">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1 italic">Confirmed</p>
                <p className="text-2xl font-black italic text-green-500">{confirmedCount || "00"}</p>
              </div>
            </div>
          </div>

          {/* Responsive Table Wrapper */}
          <div className="bg-base-200/30 backdrop-blur-md rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl shadow-black/50">
            <div className="overflow-x-auto overflow-y-hidden">
              <table className="table w-full border-collapse">
                {/* Table Head */}
                <thead className="bg-black/40">
                  <tr className="text-white/40 uppercase text-[10px] tracking-[0.2em] italic border-b border-white/5">
                    <th className="py-6 pl-8">Arena Details</th>
                    <th>Status</th>
                    <th>Squad</th>
                    <th>Economy</th>
                    <th className="text-center">Action</th>
                    <th className="pr-8 text-right">Intel</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-white/5">
                  {myContests.map((contest) => (
                    <tr key={contest._id} className="hover:bg-white/[0.02] transition-all group">
                      {/* Image & Name */}
                      <td className="py-6 pl-8">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors">
                            <img src={contest.bannerImage} alt="banner" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-black italic text-base uppercase tracking-tighter group-hover:text-primary transition-colors leading-none mb-1">
                              {contest.contestName}
                            </div>
                            <div className="text-[10px] font-bold uppercase tracking-widest opacity-30 italic">
                              {contest.contestType}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <span className={`text-[10px] font-black uppercase italic px-3 py-1 rounded-lg border ${
                          contest.status === "confirmed" ? "text-green-500 border-green-500/20 bg-green-500/5" :
                          contest.status === "rejected" ? "text-red-500 border-red-500/20 bg-red-500/5" :
                          "text-yellow-500 border-yellow-500/20 bg-yellow-500/5"
                        }`}>
                          {contest.status}
                        </span>
                      </td>

                      {/* Participants */}
                      <td>
                        <div className="flex items-center gap-2">
                          <FaUsers className="opacity-20" size={12} />
                          <span className="font-black italic text-lg">{contest.participantsCount}</span>
                        </div>
                      </td>

                      {/* Financials */}
                      <td>
                        <div className="space-y-1">
                          <div className="text-[10px] font-bold opacity-40 uppercase italic">Fee: ${contest.price}</div>
                          <div className="text-[11px] font-black text-green-500 uppercase italic flex items-center gap-1">
                            <FaTrophy size={10}/> ${contest.prizeMoney}
                          </div>
                        </div>
                      </td>

                      {/* Controls */}
                      <td>
                        <div className="flex justify-center gap-2">
                          {contest.status === "pending" ? (
                            <>
                              <button onClick={() => handleEditContest(contest)} className="p-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all">
                                <FaEdit size={14} />
                              </button>
                              <button onClick={() => handleDeleteContest(contest._id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                <FaTrash size={14} />
                              </button>
                            </>
                          ) : (
                            <span className="text-[9px] font-black opacity-20 uppercase italic tracking-widest">Locked</span>
                          )}
                        </div>
                      </td>

                      {/* View Button */}
                      <td className="pr-8 text-right">
                        <Link
                          to={`/dashboard/submitted-tasks/${contest._id}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-[10px] font-black uppercase italic tracking-widest rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-primary/20"
                        >
                          <FaEye /> View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {myContests.length === 0 && (
              <div className="py-20 text-center opacity-20 font-black italic uppercase tracking-[0.5em]">
                No Arenas Initialized
              </div>
            )}
          </div>
        </div>
      )}

      {isOpen && (
        <UpdateContest
          closeModal={() => setIsOpen(false)}
          selectedContest={selectedContest}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ManageContests;