import React, { useState } from "react";
import { FaCheck, FaTimes, FaTrashAlt, FaSearch, FaGamepad, FaCode, FaPaintBrush } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";

const PendingContests = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState('');


  const {
    data: { contests = [] } = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["contests", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests?searchText=${searchText}`);
      return res.data;
    },
  });

  const handleStatusUpdate = (id, newStatus) => {
    Swal.fire({
      title: `Confirm ${newStatus}?`,
      text: `Contest will be marked as ${newStatus}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: newStatus === "confirmed" ? "#22c55e" : "#eab308",
      cancelButtonColor: "#1a1a1a",
      background: "#111",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/pending-contests/${id}?status=${newStatus}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Updated!",
                icon: "success",
                background: "#111",
                color: "#fff",
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action is permanent!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#1a1a1a",
      background: "#111",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/admin/contests/${id}`).then(() => {
          refetch();
          Swal.fire({
            title: "Deleted!",
            icon: "success",
            background: "#111",
            color: "#fff",
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    });
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen p-4 md:p-10 text-white font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
              Manage <span className="text-primary text-stroke">Contests</span>
            </h1>
            <div className="flex items-center gap-3 mt-2 justify-center md:justify-start">
              <span className="h-0.5 w-10 bg-primary"></span>
              <p className="text-gray-500 text-xs uppercase tracking-[0.3em] font-bold">
                Total Requests: <span className="text-white">{contests.length}</span>
              </p>
            </div>
          </div>

          <div className="relative group w-full md:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by title..."
              className="input w-full bg-[#111] border-gray-800 focus:border-primary pl-12 text-sm rounded-xl h-14 transition-all focus:ring-1 focus:ring-primary/20 outline-none"
            />
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <Loading />
        ) : (
          <div className="bg-[#111] rounded-2xl border border-gray-800/50 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full border-collapse">
                <thead>
                  <tr className="bg-[#161616] border-b border-gray-800 text-gray-400 uppercase text-[10px] tracking-[0.2em]">
                    <th className="py-6 pl-8">Information</th>
                    <th>Creator</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/30">
                  {contests.map((contest) => (
                    <tr key={contest._id} className="hover:bg-white/3 transition-colors group">
                      <td className="py-6 pl-8">
                        <div className="flex items-center gap-4">
                          <div className="hidden sm:flex w-12 h-12 rounded-lg bg-[#1a1a1a] border border-gray-800 items-center justify-center group-hover:border-primary/50 transition-colors text-primary">
                             <img src={contest.bannerImage} alt="" className="w-full object-cover h-full rounded-lg"/>
                          </div>
                          <div>
                            <div className="font-bold text-gray-200 group-hover:text-white transition-colors">
                              {contest.contestName}
                            </div>
                            <div className="text-[11px] text-gray-500 mt-1 font-semibold uppercase tracking-wider">
                              {contest.contestType} • <span className="text-primary/80">${contest.price} FEE</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-xs text-gray-400 font-medium">
                        {contest.ownerEmail}
                      </td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                          contest.status === "confirmed" ? "bg-green-500/5 text-green-500 border-green-500/20" :
                          contest.status === "rejected" ? "bg-red-500/5 text-red-500 border-red-500/20" :
                          "bg-yellow-500/5 text-yellow-500 border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.05)]"
                        }`}>
                          {contest.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleStatusUpdate(contest._id, "confirmed")}
                            disabled={contest.status === "confirmed"}
                            className="p-3 rounded-lg bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white transition-all disabled:opacity-10 border border-green-500/20 hover:border-transparent shadow-lg hover:shadow-green-500/20"
                            title="Approve"
                          >
                            <FaCheck size={14} />
                          </button>

                          <button
                            onClick={() => handleStatusUpdate(contest._id, "rejected")}
                            className="p-3 rounded-lg bg-yellow-500/10 hover:bg-yellow-500 text-yellow-500 hover:text-white transition-all border border-yellow-500/20 hover:border-transparent"
                            title="Reject"
                          >
                            <FaTimes size={14} />
                          </button>

                          <button
                            onClick={() => handleDelete(contest._id)}
                            className="p-3 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all border border-red-500/20 hover:border-transparent"
                            title="Delete"
                          >
                            <FaTrashAlt size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {contests.length === 0 && (
                <div className="p-20 text-center text-gray-600 uppercase tracking-widest text-xs font-bold">
                  No pending contests found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingContests;