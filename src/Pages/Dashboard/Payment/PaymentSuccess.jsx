import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { CheckCircle, ArrowRight, Trophy } from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const [contestId, setContestId] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (sessionId) {
      axiosSecure.get(`/checkout-session/${sessionId}`).then((res) => {
        setContestId(res.data.contestId);
        setTransactionId(res.data.transactionId);
      });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#111] border border-gray-800 rounded-3xl p-8 text-center shadow-2xl">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-500/10 p-4 rounded-full">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">
          Registration Successful!
        </h1>
        <p className="text-gray-400 mb-8">
          Thank you for joining the contest. Your payment has been processed,
          and your spot is secured.
        </p>

        {/* Info Card */}
        <div className="bg-black/50 border border-gray-800 rounded-2xl p-4 mb-8 flex items-center gap-4 text-left">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Trophy className="text-primary w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase font-bold">
              transaction ID
            </p>
            <p className="text-sm text-gray-300 font-mono">
              {transactionId || "N/A"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to={`/contest-details/${contestId}`}
            className="flex items-center justify-center gap-2 w-full py-4 bg-primary hover:bg-red-700 text-white rounded-xl font-bold uppercase tracking-widest transition-all"
          >
            Go to Submission <ArrowRight size={18} />
          </Link>

          <Link
            to="/dashboard/my-contests"
            className="block w-full py-4 bg-transparent border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white rounded-xl font-bold uppercase tracking-widest transition-all"
          >
            View My Contests
          </Link>
        </div>

        {/* <p className="mt-8 text-[10px] text-gray-600 uppercase tracking-widest">
          A confirmation email has been sent to your inbox.
        </p> */}
      </div>
    </div>
  );
};

export default PaymentSuccess;
