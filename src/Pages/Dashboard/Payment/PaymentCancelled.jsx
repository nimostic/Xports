import React from "react";
import { Link, useParams } from "react-router";
import { XCircle, Home, ArrowLeft } from "lucide-react";
import Payment from "./Payment";

const PaymentCancel = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-base-200 dark:bg-[#111] border border-base-300 dark:border-white/5 rounded-[2.5rem] p-10 text-center shadow-2xl relative overflow-hidden">
        
        {/* Background Subtle Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-600/10 blur-[60px] pointer-events-none"></div>

        {/* Cancel Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-red-500/10 p-5 rounded-[2rem] border border-red-500/20 shadow-inner">
            <XCircle className="w-14 h-14 text-red-600 dark:text-red-500" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-black italic uppercase tracking-tighter text-base-content mb-3">
          Payment <span className="text-red-600">Cancelled</span>
        </h1>
        <p className="text-base-content/60 text-sm font-medium leading-relaxed mb-10 px-2">
          The transaction was not completed. No funds were withdrawn from your
          account. If this was a mistake, you can try again below.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Try Again Button (Payment Component) */}
          <div className="w-full">
             <Payment id={id}></Payment>
          </div>

          <Link
            to={`/contest-details/${id}`}
            className="flex items-center justify-center gap-2 w-full py-4 bg-base-300 dark:bg-white/5 border border-transparent hover:border-red-600/30 text-base-content font-black uppercase tracking-widest text-[11px] rounded-2xl transition-all hover:shadow-lg active:scale-95 italic"
          >
            <ArrowLeft size={14} /> Back to Details
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2 text-base-content/40 hover:text-red-600 text-[10px] font-black uppercase tracking-[0.2em] transition-all italic mt-4"
          >
            <Home size={14} /> Return to Home
          </Link>
        </div>

        {/* Support Footer */}
        <div className="mt-12 pt-8 border-t border-base-300 dark:border-white/5">
          <p className="text-[9px] text-base-content/30 font-bold uppercase tracking-[0.15em] leading-relaxed">
            Having trouble? Please contact our <span className="text-red-600/50">support team</span> if you believe this is an error.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;