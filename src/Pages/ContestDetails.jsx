import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [isEnded, setIsEnded] = useState(false);
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  //check user registered or not
  const { data: registeredData = {} } = useQuery({
    queryKey: ["isRegistered", id, user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/submissions/check?email=${user?.email}&contestId=${id}`
      );
      return res.data;
    },
  });

  const isRegistered = registeredData?.registered;
  console.log(isRegistered);
  //task submission
  const onTaskSubmit = async (data) => {
    const submissionInfo = {
      contestId: id,
      participantEmail: user?.email,
      participantName: user?.displayName,
      submissionLink: data.submissionLink,
      submittedAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("submissions/task", submissionInfo);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Submitted!",
          text: "Your task has been submitted successfully.",
          icon: "success",
          background: "#161616",
          color: "#fff",
        });
        setIsModalOpen(false);
        reset();
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  //details api
  const {
    data: contest = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`contests/${id}`);
      return res.data[0];
    },
  });

  //   console.log(contest);

  //time counting
  useEffect(() => {
    if (!contest.deadline) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const destination = new Date(contest.deadline).getTime();
      const diff = destination - now;

      if (diff <= 0) {
        setTimeLeft("CONTEST ENDED");
        setIsEnded(true);
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [contest.deadline]);


  const handlePayment = async (contest) =>{
    console.log(contest);
    const submitInfo ={
      price : contest.price,
      contestId : contest._id,
      participantEmail : user?.email,
      contestName : contest.contestName,
    }
    const res = await axiosSecure.post('/create-checkout-session',submitInfo)
    // console.log(res.data);
    window.location.assign(res.data.url)
  }


  return (
    <div className="bg-[#0a0a0a] min-h-screen py-12 text-white">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="max-w-6xl mx-auto px-4">
            {/* Banner Section */}
            <div className="relative h-[400px] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl mb-10">
              <img
                src={contest.bannerImage}
                className="w-full h-full object-cover"
                alt=""
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <span className="bg-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                  {contest.contestType}
                </span>
                <h1 className="text-5xl font-black uppercase italic tracking-tighter">
                  {contest.contestName}
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <section className="bg-[#111] p-8 rounded-2xl border border-gray-800">
                  <h2 className="text-2xl font-bold mb-4 text-primary uppercase">
                    Description
                  </h2>
                  <p className="text-gray-400 leading-relaxed">
                    {contest.description}
                  </p>
                </section>

                <section className="bg-[#111] p-8 rounded-2xl border border-gray-800">
                  <h2 className="text-2xl font-bold mb-4 text-primary uppercase">
                    Task Instructions
                  </h2>
                  <div className="bg-black/50 p-6 rounded-xl border border-dashed border-gray-700">
                    <p className="text-gray-300">{contest.instruction}</p>
                  </div>
                </section>

                {/* Winner Section (If winner exists) */}
                {contest.winnerName && (
                  <section className="bg-green-900/20 p-8 rounded-2xl border border-green-500/30 flex items-center gap-6">
                    <img
                      src={contest.winnerPhoto}
                      className="w-20 h-20 rounded-full border-2 border-green-500"
                      alt=""
                    />
                    <div>
                      <h3 className="text-green-500 font-bold uppercase tracking-widest text-sm">
                        Contest Winner
                      </h3>
                      <p className="text-2xl font-black">
                        {contest.winnerName}
                      </p>
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 sticky top-24">
                  <div className="mb-6">
                    <p className="text-gray-500 uppercase text-xs font-bold mb-1">
                      Time Remaining
                    </p>
                    <p
                      className={`text-2xl font-mono font-bold ${
                        isEnded ? "text-red-500" : "text-primary"
                      }`}
                    >
                      {timeLeft}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-black p-4 rounded-xl border border-gray-800">
                      <p className="text-gray-500 text-[10px] uppercase font-bold">
                        Prize
                      </p>
                      <p className="text-xl font-bold text-white">
                        ${contest.prizeMoney}
                      </p>
                    </div>
                    <div className="bg-black p-4 rounded-xl border border-gray-800">
                      <p className="text-gray-500 text-[10px] uppercase font-bold">
                        Participants
                      </p>
                      <p className="text-xl font-bold text-white">
                        {contest.participantsCount || 0}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {!isRegistered ? (
                    <button
                      disabled={isEnded}
                      onClick={() => handlePayment(contest)}
                      className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all ${
                        isEnded
                          ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                          : "bg-primary hover:bg-red-700 text-white shadow-[0_0_20px_rgba(244,14,8,0.3)]"
                      }`}
                    >
                      {isEnded
                        ? "Registration Closed"
                        : `Register Now ($${contest.price})`}
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                    >
                      Submit Task
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Task Submission Modal */}
          {isModalOpen && (
            <dialog className="modal modal-open">
              <div className="modal-box bg-[#111] border border-gray-700">
                <h3 className="font-black text-2xl uppercase italic text-primary">
                  Submit Your Work
                </h3>

                <p className="py-4 text-gray-400">
                  Provide the links to your submission (Drive, GitHub, or any
                  other platform).
                </p>

                <form onSubmit={handleSubmit(onTaskSubmit)}>
                  <textarea
                    {...register("submissionLink", { required: true })}
                    className="textarea textarea-bordered w-full h-32 bg-black border-gray-700 text-white focus:border-primary"
                    placeholder="Paste your links here..."
                  ></textarea>

                  <div className="modal-action">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="btn btn-ghost text-gray-500"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn bg-primary hover:bg-red-700 text-white border-none uppercase"
                    >
                      Submit Task
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          )}
        </>
      )}
    </div>
  );
};

export default ContestDetails;
