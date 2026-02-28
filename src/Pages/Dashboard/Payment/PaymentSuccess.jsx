import React, { use, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { CheckCircle, ArrowRight, Trophy, Hash } from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../Provider/AuthContext";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [contestId, setContestId] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = use(AuthContext);

  useEffect(() => {
    if (!sessionId || paymentProcessed) return;

    const completePayment = async () => {
      try {
        const res = await axiosSecure.post("/payment-success", { sessionId });

        if (res.data.success) {
          if (res.data.message !== "Already processed") {
            toast.success("Registration Successful!");
          }
          const sessionRes = await axiosSecure.get(
            `/checkout-session/${sessionId}`
          );
          setContestId(sessionRes.data.contestId);
          setTransactionId(sessionRes.data.transactionId);
          queryClient.invalidateQueries(["isRegistered"]);
          setPaymentProcessed(true);
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };

    completePayment();
  }, [sessionId, axiosSecure, queryClient, paymentProcessed]);

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-base-200 dark:bg-[#111] border border-base-300 dark:border-white/5 rounded-[2.5rem] p-10 text-center shadow-2xl relative overflow-hidden">
        
        {/* Success Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-green-500/10 blur-[80px] pointer-events-none"></div>

        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-green-500/10 p-5 rounded-4xl border border-green-500/20 shadow-inner animate-bounce-slow">
            <CheckCircle className="w-14 h-14 text-green-600 dark:text-green-500" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-black italic uppercase tracking-tighter text-base-content mb-3 leading-none">
          Registration <span className="text-green-600">Successful!</span>
        </h1>
        <p className="text-base-content/60 text-sm font-medium leading-relaxed mb-10 px-4">
          Welcome to the arena! Your spot is secured and your journey to the trophy begins now.
        </p>

        {/* Info Card / Transaction ID */}
        <div className="bg-base-300/50 dark:bg-white/5 border border-base-300 dark:border-white/10 rounded-2xl p-5 mb-10 flex items-center gap-4 text-left group transition-all hover:border-green-500/30">
          <div className="bg-green-500/20 p-3 rounded-xl">
            <Hash className="text-green-600 dark:text-green-500 w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[9px] text-base-content/40 uppercase font-black tracking-widest mb-1 italic">
              Transaction ID
            </p>
            <p className="text-xs text-base-content font-mono truncate">
              {transactionId || "Processing..."}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to={`/contest-details/${contestId}`}
            className="flex items-center justify-center gap-3 w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all shadow-lg shadow-red-600/20 active:scale-95 italic"
          >
            Go to Submission <ArrowRight size={16} />
          </Link>

          <Link
            to="/dashboard/participated-contest"
            className="flex items-center justify-center gap-2 w-full py-4 bg-transparent border border-base-300 dark:border-white/10 hover:border-green-500/30 text-base-content/60 hover:text-base-content rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all italic"
          >
            View My Arena
          </Link>
        </div>

        {/* Footer Note */}
        <div className="mt-10 pt-6 border-t border-base-300 dark:border-white/5">
           <div className="flex items-center justify-center gap-2 text-amber-500/50">
              <Trophy size={14} />
              <p className="text-[9px] font-black uppercase tracking-[0.2em] italic">
                Ready for the win?
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;