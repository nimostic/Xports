import React from "react";
import { Link, useParams } from "react-router";
import { XCircle, RefreshCw, Home } from "lucide-react";
import Payment from "./Payment";

const PaymentCancel = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#111] border border-gray-800 rounded-3xl p-8 text-center shadow-2xl">
        {/* Cancel Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-500/10 p-4 rounded-full">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl text-base-content text-base-content uppercase italic tracking-tighter mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-400 mb-8">
          The transaction was not completed. No funds were withdrawn from your
          account. If this was a mistake, you can try again.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Payment id={id}></Payment>

          <Link
            to={`/contest-details/${id}`}
            className="flex items-center justify-center gap-2 w-full py-4 bg-transparent border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-base-content rounded-xl font-bold uppercase tracking-widest transition-all"
          >
            Back to Details
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2 text-gray-500 hover:text-gray-300 text-xs font-bold uppercase tracking-widest transition-all"
          >
            <Home size={14} /> Go to Home
          </Link>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800/50">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest leading-relaxed">
            Having trouble? Please contact our support if you believe this is an
            error.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
