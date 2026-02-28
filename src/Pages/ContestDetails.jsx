import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useRole from "../Hooks/useRole";
import AngledButton from "../Components/AngledButton";
import { Clock, Users, Trophy, Info, ClipboardList } from "lucide-react";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [isEnded, setIsEnded] = useState(false);
  const [taskSubmitted, setTaskSubmitted] = useState(false);
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [role] = useRole();

  const { data: registeredData = {} } = useQuery({
    queryKey: ["isRegistered", id, user?.email],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/submissions/check-registration?email=${user?.email}&contestId=${id}`
      );
      return res.data;
    },
  });

  const isRegistered = registeredData?.registered;
  const submitted = registeredData?.status === "submitted";

  const { data: contest = {}, isLoading } = useQuery({
    queryKey: ["contest", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`contests/${id}`);
      return res.data[0] || res.data;
    },
  });

  const isAdminOrCreator = role === "admin" || role === "creator";

  const handlePayment = async () => {
    if (!user) return navigate("/login");
    if (isAdminOrCreator) {
      return toast.error("Admins and Creators cannot participate!");
    }
    const submitInfo = {
      price: contest.price,
      contestId: contest._id,
      participantEmail: user?.email,
      contestName: contest.contestName,
      description: contest.description,
      image: contest.bannerImage,
      participantName: user?.displayName,
      participantPhoto: user?.photoURL,
    };

    try {
      const res = await axiosSecure.post("/create-checkout-session", submitInfo);
      if (res.data?.url) {
        window.location.assign(res.data.url);
      }
    } catch (error) {
      toast.error("Payment initiation failed!");
    }
  };

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
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Submitted!",
          text: "Task submitted successfully.",
          icon: "success",
          background: "var(--fallback-b1,oklch(var(--b1)))",
          color: "var(--fallback-bc,oklch(var(--bc)))",
        });
        setIsModalOpen(false);
        setTaskSubmitted(true);
        reset();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting task");
    }
  };

  useEffect(() => {
    if (!contest?.deadline) return;

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
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [contest?.deadline]);

  if (isLoading) return <Loading />;

  return (
    <div className="bg-base-100 min-h-screen py-12 text-base-content transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        {/* Banner Section */}
        <div className="relative h-[300px] md:h-[450px] rounded-[2.5rem] overflow-hidden border border-base-300 dark:border-white/10 mb-12 shadow-2xl">
          <img
            src={contest.bannerImage}
            className="w-full h-full object-cover"
            alt={contest.contestName}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          <div className="absolute bottom-10 left-10 right-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary text-primary-content px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] italic">
                {contest.contestType}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
              {contest.contestName}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Side: Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <section className="bg-base-200/50 dark:bg-white/[0.02] p-8 rounded-3xl border border-base-300 dark:border-white/5">
              <div className="flex items-center gap-2 mb-6 text-primary">
                <Info size={20} />
                <h2 className="text-xl font-black uppercase italic tracking-tight">Description</h2>
              </div>
              <p className="text-base-content/70 leading-relaxed font-medium">
                {contest.description}
              </p>
            </section>

            {/* Instruction Card */}
            <section className="bg-base-200/50 dark:bg-white/[0.02] p-8 rounded-3xl border border-base-300 dark:border-white/5">
              <div className="flex items-center gap-2 mb-6 text-primary">
                <ClipboardList size={20} />
                <h2 className="text-xl font-black uppercase italic tracking-tight">Task Instructions</h2>
              </div>
              <div className="text-base-content/80 bg-base-300/30 dark:bg-black/20 p-6 rounded-2xl border border-dashed border-base-300 dark:border-white/10 italic font-medium">
                {contest.instruction}
              </div>
            </section>

            {/* Winner Section */}
            {isEnded && (
              <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-transparent to-transparent p-8 rounded-[2rem] border border-primary/20 shadow-xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2 text-primary">
                    <Trophy size={24} />
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter">Winner</h2>
                  </div>
                  {contest?.winnerName && (
                    <span className="px-4 py-1 text-[10px] font-black uppercase rounded-full bg-green-500/10 text-green-500 tracking-[0.2em] italic">
                      Finalized
                    </span>
                  )}
                </div>

                {contest?.winnerName ? (
                  <div className="flex flex-col sm:flex-row items-center gap-8 bg-white/5 dark:bg-black/40 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <div className="relative shrink-0">
                      <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-primary shadow-2xl rotate-3">
                        <img
                          src={contest.winnerPhoto}
                          alt={contest.winnerName}
                          className="w-full h-full object-cover -rotate-3 scale-110"
                        />
                      </div>
                      <div className="absolute -bottom-4 -right-4 bg-primary text-primary-content p-2 rounded-xl shadow-xl">
                         🏆
                      </div>
                    </div>

                    <div className="text-center sm:text-left">
                      <h3 className="text-3xl font-black italic uppercase text-base-content tracking-tighter">
                        {contest.winnerName}
                      </h3>
                      <p className="text-base-content/50 font-bold text-xs uppercase tracking-widest mt-2">
                        Contest Champion
                      </p>
                      <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-4 text-xs font-black uppercase tracking-widest">
                        <div className="bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20">
                           <span className="text-green-500">Prize: ${contest.prizeMoney}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 text-base-content/30 font-black uppercase tracking-[0.3em] italic border-2 border-dashed border-base-300 dark:border-white/5 rounded-3xl">
                    Results Pending
                  </div>
                )}
              </section>
            )}
          </div>

          {/* Right Side: Sidebar */}
          <div className="space-y-6">
            <div className="bg-base-200 dark:bg-[#111] p-8 rounded-[2.5rem] border border-base-300 dark:border-white/5 sticky top-24 shadow-xl">
              <div className="mb-8">
                <p className="text-base-content/40 uppercase text-[10px] font-black tracking-[0.2em] mb-3 flex items-center gap-2 italic">
                  <Clock size={14} className="text-primary" /> Time Remaining
                </p>
                <p className={`text-4xl font-black italic tracking-tighter leading-none ${isEnded ? "text-red-600" : "text-primary"}`}>
                  {timeLeft}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-base-300/50 dark:bg-white/5 p-4 rounded-2xl border border-base-300 dark:border-white/5 text-center transition-transform hover:scale-105">
                  <p className="text-base-content/40 text-[9px] uppercase font-black tracking-widest mb-1">Prize</p>
                  <p className="text-xl font-black italic text-base-content">${contest.prizeMoney}</p>
                </div>
                <div className="bg-base-300/50 dark:bg-white/5 p-4 rounded-2xl border border-base-300 dark:border-white/5 text-center transition-transform hover:scale-105">
                  <p className="text-base-content/40 text-[9px] uppercase font-black tracking-widest mb-1 italic flex items-center justify-center gap-1"> <Users size={10}/> Join</p>
                  <p className="text-xl font-black italic text-base-content">{contest.participantsCount || 0}</p>
                </div>
              </div>

              {user?.email === contest?.ownerEmail ? (
                <Link to={`/dashboard/submitted-tasks/${id}`}>
                  <AngledButton text="View Submissions" className="w-full h-14" />
                </Link>
              ) : (
                <div className="space-y-4">
                  {!isRegistered ? (
                    <button
                      disabled={isEnded || isAdminOrCreator}
                      onClick={handlePayment}
                      className={`w-full h-16 rounded-2xl font-black uppercase tracking-widest text-xs transition-all italic ${
                        isEnded || isAdminOrCreator
                          ? "bg-base-300 text-base-content/20 cursor-not-allowed"
                          : "bg-primary text-primary-content hover:bg-red-700 shadow-[0_10px_20px_-10px_rgba(239,68,68,0.5)] active:scale-95"
                      }`}
                    >
                      {isEnded ? "Entry Closed" : isAdminOrCreator ? "Limited Access" : `Enroll now $${contest.price}`}
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      disabled={taskSubmitted || submitted}
                      className={`w-full h-16 rounded-2xl font-black uppercase tracking-widest text-xs transition-all italic shadow-lg ${
                        taskSubmitted || submitted
                          ? "bg-green-600/20 text-green-500 border border-green-500/30"
                          : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                      }`}
                    >
                      {taskSubmitted || submitted ? "Work Submitted" : "Upload Task"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Theme Compatible */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-base-200 dark:bg-[#111] border border-base-300 dark:border-white/10 p-10 rounded-[2.5rem] w-full max-w-lg shadow-2xl">
            <h3 className="text-3xl font-black uppercase italic text-primary tracking-tighter mb-6">
              Submit Task
            </h3>
            <form onSubmit={handleSubmit(onTaskSubmit)} className="space-y-6">
              <textarea
                {...register("submissionLink", { required: true })}
                className="textarea textarea-bordered w-full h-40 bg-base-100 dark:bg-black/20 border-base-300 dark:border-white/10 text-base-content focus:border-primary rounded-2xl p-4 font-medium"
                placeholder="Paste your Drive link, GitHub Repo, or Portfolio link here..."
              ></textarea>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 h-14 rounded-2xl font-black uppercase text-xs text-base-content/40 hover:text-base-content transition-all"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="flex-[2] h-14 rounded-2xl bg-primary text-primary-content font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-lg"
                >
                  Confirm Submission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestDetails;