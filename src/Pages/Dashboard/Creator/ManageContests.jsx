import { useQuery } from "@tanstack/react-query";
import React, { use, useState } from "react";
import { FaEdit, FaTrash, FaEye, FaUsers, FaTrophy } from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import Swal from "sweetalert2";
import UpdateContest from "./UpdateContest";

const ManageContests = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [selectedContest, setSelectedContest] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: myContests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myContests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-contests?email=${user.email}`);
      return res.data;
    },
  });
  const confirmedCount = myContests.filter(
    (c) => c.status === "confirmed"
  ).length;

  const handleDeleteContest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete this contest?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F40E08",
      cancelButtonColor: "#111",
      confirmButtonText: "Yes, Delete it!",
      background: "#161616",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/contests/${id}?email=${user.email}`)
          .then((res) => {
            if (res.data.deletedCount || res.status === 200) {
              refetch();
              Swal.fire({
                title: "Success!",
                text: "Contest deleted successfully!",
                icon: "success",
                background: "#161616",
                color: "#fff",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Error",
              text: "Deletion failed!",
              icon: "error",
              background: "#161616",
              color: "#fff",
            });
          });
      }
    });
  };

  const handleEditContest = (contest) => {
    setSelectedContest(contest);
    // modalRef.current.showModal();
    setIsOpen(true);
  };
  return (
    <div className="bg-[#0a0a0a] min-h-screen p-6 text-white">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <div>
                <h1 className="text-4xl font-black italic uppercase tracking-tighter">
                  My Created <span className="text-primary">Contests</span>
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  Manage and track your hosted competitions
                </p>
              </div>
              <div className="bg-[#111] border border-gray-800 px-6 py-3 rounded-2xl flex gap-8">
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase font-bold">
                    Total Hosted
                  </p>
                  <p className="text-xl font-mono font-bold text-primary">
                    {myContests.length}
                  </p>
                </div>
                <div className="text-center border-l border-gray-800 pl-8">
                  <p className="text-xs text-gray-500 uppercase font-bold">
                    Confirmed
                  </p>
                  <p className="text-xl font-mono font-bold text-green-500">
                    {confirmedCount ? `${confirmedCount}` : "None"}
                  </p>
                </div>
              </div>
            </div>

            {/* Table Structure */}
            <div className="bg-[#111] rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  {/* Table Head */}
                  <thead className="bg-[#161616] border-b border-gray-800">
                    <tr className="text-gray-400 uppercase text-[11px] tracking-widest">
                      <th className="py-6 pl-8">Contest Details</th>
                      <th>Status</th>
                      <th>Stats</th>
                      <th>Financials</th>
                      <th className="text-center">Control</th>
                      <th className="pr-8">Submissions</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-gray-800/50">
                    {myContests.map((contest) => (
                      <tr
                        key={contest._id}
                        className="hover:bg-white/2 transition-all group"
                      >
                        {/* Contest Name & Type */}
                        <td className="py-6 pl-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black">
                              <img
                                src={contest.bannerImage}
                                alt={contest.contestName.charAt(0)}
                              />
                            </div>
                            <div>
                              <div className="font-bold text-lg group-hover:text-primary transition-colors cursor-pointer">
                                {contest.contestName}
                              </div>
                              <div className="text-xs text-gray-500 font-medium">
                                {contest.contestType}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td>
                          <div
                            className={`badge badge-md border-none rounded-lg font-bold text-[10px] uppercase px-3 py-3 ${
                              contest.status === "confirmed"
                                ? "bg-green-500/10 text-green-500"
                                : contest.status === "rejected"
                                ? "bg-red-500/10 text-red-500"
                                : "bg-yellow-500/10 text-yellow-500"
                            }`}
                          >
                            {contest.status}
                          </div>
                        </td>

                        {/* Stats (Participants) */}
                        <td>
                          <div className="flex items-center gap-2 text-gray-300">
                            <FaUsers className="text-gray-600" />
                            <span className="font-mono font-bold text-lg">
                              {contest.participantsCount}
                            </span>
                          </div>
                        </td>

                        {/* Financials (Fee & Prize) */}
                        <td>
                          <div className="space-y-1">
                            <div className="text-xs text-gray-500">
                              Fee:{" "}
                              <span className="text-white">
                                ${contest.price}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs font-bold text-green-500">
                              <FaTrophy size={10} /> Prize: $
                              {contest.prizeMoney}
                            </div>
                          </div>
                        </td>

                        {/* Control (Edit/Delete - Conditional) */}
                        <td className="text-center">
                          <div className="flex justify-center gap-2">
                            {contest.status === "pending" ? (
                              <>
                                <button
                                  onClick={() => handleEditContest(contest)}
                                  className="btn btn-square btn-sm bg-blue-600/10 hover:bg-blue-600 border-none text-blue-500 hover:text-white transition-all"
                                >
                                  {/* Edit button */}
                                  <FaEdit size={14} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteContest(contest._id)
                                  }
                                  className="btn btn-square btn-sm bg-red-600/10 hover:bg-red-700 border-none text-red-500 hover:text-white transition-all"
                                >
                                  {/* delete button  */}
                                  <FaTrash size={14} />
                                </button>
                              </>
                            ) : (
                              <div className="text-[10px] text-gray-600 italic font-medium uppercase tracking-tighter">
                                Action Disabled
                              </div>
                            )}
                          </div>
                        </td>

                        {/* See Submissions Button */}
                        <td className="pr-8">
                          <button className="btn btn-sm w-full bg-primary hover:bg-red-700 text-white border-none rounded-xl uppercase font-black text-[10px] tracking-tighter shadow-lg shadow-primary/20">
                            <FaEye /> View Work
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {isOpen && (
        <UpdateContest
          closeModal={() => setIsOpen(false)}
          selectedContest={selectedContest}
          refetch={refetch}
        ></UpdateContest>
      )}
    </div>
  );
};

export default ManageContests;
