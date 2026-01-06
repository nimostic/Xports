import React from "react";
import {
  FaTrophy,
  FaUserAlt,
  FaEnvelope,
  FaExternalLinkAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../../../Components/Loading";

const SubmittedTasks = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  // total submissionon by contest
  //console.log(id);
  const {
    data: submissions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["submissions", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}/submissions`);
      return res.data;
    },
  });
  //console.log(submissions);

  const handleWinner = (data) => {
    console.log(data);
    axiosSecure
      .patch(`/declare-winner/${id}`, data)
      .then((res) => {
        toast.success(
          `${data.participantName} has been declared as WINNER🥳🎉🎊`
        );
        refetch();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

    const hasWinner = submissions.some((s) => s.isWinner);
 

  return (
    <div className="bg-[#0a0a0a] min-h-screen p-6 text-white font-sans">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <Link
                to="/dashboard/manage-contests"
                className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-4 text-sm font-bold uppercase tracking-widest"
              >
                <FaArrowLeft /> Back to Contests
              </Link>
              <h1 className="text-5xl font-black italic uppercase tracking-tighter">
                Submitted <span className="text-primary">Tasks</span>
              </h1>
              <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest">
                Contest:{" "}
                <span className="text-gray-300 font-bold">
                  UI/UX Design Challenge 2024
                </span>
              </p>
            </div>

            <div className="hidden md:block bg-[#111] border border-gray-800 p-4 rounded-2xl">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-widest">
                Total Submissions
              </p>
              <p className="text-3xl font-mono font-black text-primary">
                {submissions.length}
              </p>
            </div>
          </div>

          {/* tabl;e */}
          <div className="bg-[#111] rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-[#161616] border-b border-gray-800">
                  <tr className="text-gray-400 uppercase text-[11px] tracking-widest">
                    <th className="py-6 pl-8">Participant Info</th>
                    <th>Submission Link</th>
                    <th className="text-center">Action / Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-800/50">
                  {submissions.map((sub) => (
                    <tr
                      key={sub._id}
                      className="hover:bg-white/2 transition-all group"
                    >
                      <td className="py-6 pl-8">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-primary to-red-800 flex items-center justify-center font-bold text-white">
                            <img src={sub.participantPhoto} alt="Participant Photo" />
                          </div>
                          <div>
                            <div className="font-bold text-base group-hover:text-primary transition-colors">
                              {sub.participantName}
                            </div>
                            <div className="text-xs text-gray-500 font-medium lowercase">
                              {sub.participantEmail}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* task link */}
                      <td>
                        <a
                          href={sub.submissionLink}
                          target="_blank"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-800 text-blue-400 hover:bg-blue-600 hover:text-white transition-all text-xs font-bold uppercase tracking-tighter"
                        >
                          <FaExternalLinkAlt size={10} /> Preview Work
                        </a>
                      </td>

                      {/* declare winner */}
                      <td className="text-center">
                        {sub.isWinner ? (
                          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 border border-green-500/20 py-2 px-5 rounded-full font-black uppercase text-[10px] shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                            <FaTrophy /> Champion Selected
                          </div>
                        ) : (
                          <button
                            disabled={hasWinner}
                            onClick={() => handleWinner(sub)}
                            className={`btn btn-sm px-6 rounded-xl font-black uppercase text-[10px] tracking-tighter transition-all ${
                              hasWinner
                                ? "btn-disabled bg-gray-900 text-gray-700 border-none"
                                : "bg-primary text-white border-none hover:bg-red-700 shadow-lg shadow-primary/20"
                            }`}
                          >
                            Declare Winner
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-6 text-center text-gray-600 text-[10px] uppercase tracking-[0.2em] font-medium">
            Warning: You can only select{" "}
            <span className="text-primary">one winner</span> per contest.
          </p>
        </div>
      )}
    </div>
  );
};

export default SubmittedTasks;
