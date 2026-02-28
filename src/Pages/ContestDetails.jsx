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
        `/submissions/check-registration?email=${user?.email}&contestId=${id}`,
      );
      return res.data;
    },
  });
  const isRegistered = registeredData?.registered;
  const submitted = registeredData?.status === "submitted";
  // console.log(role);

  // details api
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
      const res = await axiosSecure.post(
        "/create-checkout-session",
        submitInfo,
      );
      if (res.data?.url) {
        window.location.assign(res.data.url);
      }
      // eslint-disable-next-line no-unused-vars
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
    // console.log(submissionInfo);

    try {
      const res = await axiosSecure.post("submissions/task", submissionInfo);
      //console.log(res);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Submitted!",
          text: "Task submitted successfully.",
          icon: "success",
          background: "#161616",
          color: "#fff",
        });
        setIsModalOpen(false);
        setTaskSubmitted(true);
        reset();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting task");
    }
  };

  // Timer Logic
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
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [contest?.deadline]);

  if (isLoading) return <Loading />;

  return (
    <div className="bg-[#0a0a0a] min-h-screen py-12 text-base-content">
      <div className="max-w-6xl mx-auto px-4">
        {/* Banner */}
        <div className="relative h-[400px] rounded-3xl overflow-hidden border border-gray-800 mb-10">
          <img
            src={contest.bannerImage}
            className="w-full h-full object-cover"
            alt=""
          />
          <div className="absolute inset-0 bg-linear-to-t from-black to-transparent"></div>
          <div className="absolute bottom-8 left-8">
            <span className="bg-primary px-4 py-1 rounded-full text-xs font-bold mb-4 inline-block tracking-widest uppercase">
              {contest.contestType}
            </span>
            <h1 className="text-5xl text-base-content uppercase italic tracking-tighter">
              {contest.contestName}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
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
              <p className="text-gray-300 bg-base-100/50 p-6 rounded-xl border border-dashed border-gray-700">
                {contest.instruction}
              </p>
            </section>
            {isEnded && (
              <section className="bg-[#111] p-8 rounded-2xl border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-base-content uppercase text-primary tracking-wider">
                    Winner
                  </h2>

                  {contest?.winnerName && (
                    <span className="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-green-500/10 text-green-500 tracking-widest">
                      Contest Winner
                    </span>
                  )}
                </div>

                {contest?.winnerName ? (
                  <div className="flex flex-col sm:flex-row items-center gap-6 bg-base-100/40 p-6 rounded-xl border border-gray-700">
                    {/* Winner Image */}
                    <div className="relative shrink-0">
                      <img
                        src={contest.winnerPhoto}
                        alt={contest.winnerName}
                        className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                      />
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-xs text-base-content text-base-content">
                        🏆
                      </div>
                    </div>

                    {/* Winner Info */}
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold text-base-content">
                        {contest.winnerName}
                      </h3>

                      <p className="text-gray-400 text-sm mt-1">
                        Champion of{" "}
                        <span className="text-primary font-semibold">
                          {contest.contestName}
                        </span>
                      </p>

                      <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-6 text-xs uppercase tracking-widest">
                        <span className="text-gray-400">
                          Prize:
                          <span className="ml-1 text-green-500 font-bold">
                            ${contest.prizeMoney}
                          </span>
                        </span>

                        <span className="text-gray-400">
                          Status:
                          <span className="ml-1 text-primary font-bold">
                            Finalized
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500 italic uppercase tracking-widest border border-dashed border-gray-700 rounded-xl">
                    Winner not announced yet
                  </div>
                )}
              </section>
            )}
          </div>

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
                <div className="bg-base-100 p-4 rounded-xl border border-gray-800 text-center">
                  <p className="text-gray-500 text-[10px] uppercase font-bold">
                    Prize
                  </p>
                  <p className="text-xl font-bold">${contest.prizeMoney}</p>
                </div>
                <div className="bg-base-100 p-4 rounded-xl border border-gray-800 text-center">
                  <p className="text-gray-500 text-[10px] uppercase font-bold">
                    Participants
                  </p>
                  <p className="text-xl font-bold">
                    {contest.participantsCount || 0}
                  </p>
                </div>
              </div>

              {user?.email === contest?.ownerEmail ? (
                <Link to={`/dashboard/submitted-tasks/${id}`}>
                  <AngledButton
                    text="View Work"
                    className="w-full"
                  ></AngledButton>
                </Link>
              ) : (
                <>
                  {/* Registration Button Logic */}
                  {!isRegistered ? (
                    <button
                      disabled={isEnded || isAdminOrCreator}
                      onClick={handlePayment}
                      className={`w-full py-4 rounded-xl text-base-content uppercase tracking-widest transition-all ${
                        isEnded || isAdminOrCreator
                          ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                          : "bg-primary hover:bg-red-700 text-base-content shadow-lg"
                      }`}
                    >
                      {isEnded
                        ? "Registration Closed"
                        : isAdminOrCreator
                          ? "Participation Not Allowed"
                          : `Register Now ($${contest.price})`}
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      disabled={taskSubmitted || submitted}
                      className={`w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-base-content text-base-content uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20`}
                    >
                      {taskSubmitted || submitted ? "Submitted" : "Submit Task"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box bg-[#111] border border-gray-700">
            <h3 className="text-base-content text-2xl uppercase italic text-primary">
              Submit Your Work
            </h3>
            <form onSubmit={handleSubmit(onTaskSubmit)} className="mt-4">
              <textarea
                {...register("submissionLink", { required: true })}
                className="textarea textarea-bordered w-full h-32 bg-base-100 border-gray-700 text-base-content focus:border-primary"
                placeholder="Paste your links (Drive/GitHub) here..."
              ></textarea>
              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-primary hover:bg-red-700 text-base-content border-none uppercase"
                >
                  Submit Task
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ContestDetails;
