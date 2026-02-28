import React, { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Page open holei upore niye jabe
  }, []);

  return (
    <div className="bg-base-100 py-16 text-base-content px-4">
      <div className="max-w-4xl mx-auto bg-base-100 p-8 md:p-12 rounded-3xl border border-gray-800">
        <h1 className="text-4xl font-black text-primary uppercase italic mb-10">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-gray-400">
          <section>
            <h2 className="text-xl font-bold text-base-content mb-2">
              1. Information Collection
            </h2>
            <p>
              We collect your name, email, and photo during Google login to
              identify you in contests.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-base-content mb-2">
              2. Payment Security
            </h2>
            <p>
              All payments are processed through Stripe. We do not store your
              credit card details.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-base-content mb-2">
              3. Data Usage
            </h2>
            <p>
              Your data is only used to manage your contest participations and
              winning records.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
