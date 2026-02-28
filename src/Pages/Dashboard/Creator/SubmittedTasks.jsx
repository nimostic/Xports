import React from "react";
import { FaTrophy, FaExternalLinkAlt, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../../../Components/Loading";

const SubmittedTasks = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { data: submissions = [], isLoading, refetch } = useQuery({
    queryKey: ["submissions", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}/submissions`);
      return res.data;
    },
  });

  const handleWinner = (data) => {
    axiosSecure
      .patch(`/declare-winner/${id}`, data)
      .then(() => {
        toast.success(`${data.participantName} IS THE CHAMPION! 🏆`);
        refetch();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const hasWinner = submissions.some((s) => s.isWinner);

  return (
    <div className="bg-base-100 min-h-screen p-4 md:p-10 text-base-content">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="space-y-4">
              <Link
                to="/dashboard/manage-contests"
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-primary transition-all group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
                Return to Arena
              </Link>
              <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
                Mission <span className="text-primary">Intel</span>
              </h1>
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-primary rounded-full"></div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 italic">
                   Reviewing Submissions
                </p>
              </div>
            </div>

            {/* Stats Badge */}
            <div className="bg-base-200/50 backdrop-blur-md border border-white/5 p-6 rounded-[2rem] min-w-[200px] text-center md:text-left">
              <p className="text-[9px] text-white/40 uppercase font-black mb-1 tracking-[0.3em] italic">
                Total Candidates
              </p>
              <p className="text-4xl font-black italic text-primary leading-none">
                {submissions.length.toString().padStart(2, '0')}
              </p>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="bg-base-200/30 backdrop-blur-xl rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl shadow-black/50">
            <div className="overflow-x-auto">
              <table className="table w-full border-collapse">
                <thead className="bg-black/40 border-b border-white/5">
                  <tr className="text-white/40 uppercase text-[10px] tracking-[0.2em] italic">
                    <th className="py-7 pl-10 text-left font-black">Candidate</th>
                    <th className="text-left font-black">Intel Link</th>
                    <th className="text-center font-black pr-10">Status / Command</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {submissions.map((sub) => (
                    <tr key={sub._id} className="hover:bg-white/[0.02] transition-all group">
                      {/* Participant Info */}
                      <td className="py-6 pl-10">
                        <div className="flex items-center gap-5">
                          <div className="relative">
                            <img
                              src={sub.participantPhoto}
                              alt="Avatar"
                              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white/5 group-hover:ring-primary/40 transition-all"
                            />
                            {sub.isWinner && (
                                <div className="absolute -top-2 -right-2 bg-yellow-500 text-black p-1 rounded-lg shadow-lg animate-bounce">
                                    <FaTrophy size={10} />
                                </div>
                            )}
                          </div>
                          <div>
                            <div className="font-black italic text-base uppercase tracking-tighter group-hover:text-primary transition-colors leading-none mb-1">
                              {sub.participantName}
                            </div>
                            <div className="text-[10px] font-bold uppercase tracking-widest opacity-30 italic">
                              {sub.participantEmail}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Link Section */}
                      <td>
                        <a
                          href={sub.submissionLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all text-[10px] font-black uppercase italic tracking-widest"
                        >
                          <FaExternalLinkAlt size={10} /> Preview Work
                        </a>
                      </td>

                      {/* Action Section */}
                      <td className="text-center pr-10">
                        {sub.isWinner ? (
                          <div className="inline-flex items-center gap-2 bg-green-500 text-black py-2 px-6 rounded-xl font-black uppercase text-[10px] italic shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                            <FaCheckCircle /> Champion Declared
                          </div>
                        ) : (
                          <button
                            disabled={hasWinner}
                            onClick={() => handleWinner(sub)}
                            className={`px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all italic ${
                              hasWinner
                                ? "bg-white/5 text-white/10 cursor-not-allowed border border-white/5"
                                : "bg-primary text-white hover:bg-red-700 shadow-lg shadow-primary/20 hover:-translate-y-0.5"
                            }`}
                          >
                            {hasWinner ? "Locked" : "Promote to Winner"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {submissions.length === 0 && (
              <div className="py-24 text-center">
                 <p className="text-[10px] font-black opacity-20 uppercase tracking-[0.5em] italic">No missions submitted yet</p>
              </div>
            )}
          </div>

          <p className="mt-8 text-center text-white/20 text-[9px] uppercase tracking-[0.3em] font-black italic">
            Note: Selection of <span className="text-primary/50">one champion</span> is final and cannot be reversed.
          </p>
        </div>
      )}
    </div>
  );
};

export default SubmittedTasks;