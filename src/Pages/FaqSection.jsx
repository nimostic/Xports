import Aos from "aos";
import React from "react";

const faqs = [
  {
    question: "How do I participate in a contest?",
    answer:
      "Simply browse the 'All Contests' page, select a contest you like, pay the registration fee via our secure Stripe gateway, and you're in!",
  },
  {
    question: "Can I host my own contest?",
    answer:
      "Yes! You need to apply to become a 'Creator' from your profile. Once the admin approves your request, you can start hosting contests.",
  },
  {
    question: "What happens if I win a contest?",
    answer:
      "Winners are announced by the contest creator. Once confirmed, the prize money will be processed according to the contest's specific terms.",
  },
  {
    question: "Are the payments secure?",
    answer:
      "Absolutely. We use Stripe, a world-class payment processor, to ensure your card details are never stored on our servers.",
  },
];

const FaqSection = () => {
  Aos.init();
  return (
    <section className="py-20 bg-base-100">
      <div data-aos="fade-left" className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-base-content italic uppercase tracking-tighter">
            Common <span className="text-blue-500">Questions</span>
          </h2>
          <p className="text-gray-500 mt-4 uppercase text-xs font-bold tracking-[0.2em]">
            Everything you need to know about our platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-plus bg-base-100 border border-gray-800 rounded-2xl"
            >
              <input
                type="radio"
                name="my-accordion-3"
                defaultChecked={index === 0}
              />
              <div className="collapse-title text-lg font-bold text-base-content italic">
                {faq.question}
              </div>
              <div className="collapse-content text-base-content text-sm">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
