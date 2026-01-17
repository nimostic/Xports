import React, { useEffect } from "react";

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen py-16 text-white px-4">
      <div className="max-w-4xl mx-auto bg-[#111] p-8 md:p-12 rounded-3xl border border-gray-800">
        <h1 className="text-4xl font-black uppercase italic text-primary mb-10">Terms & Conditions</h1>
        <div className="space-y-6 text-gray-400">
          <section>
            <h2 className="text-xl font-bold text-white mb-2">1. Contest Participation</h2>
            <p>Users must provide valid work links. Fake or empty links will result in disqualification.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-2">2. Refund Policy</h2>
            <p>Once you register for a contest, the fee is non-refundable unless the contest is cancelled.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-2">3. Intellectual Property</h2>
            <p>The creator of the contest owns the right to the tasks submitted unless stated otherwise.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;