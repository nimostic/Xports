import Aos from "aos";
import React from "react";
import { FaTrophy, FaShieldAlt, FaRocket, FaUsers } from "react-icons/fa";

const services = [
  {
    title: "Contest Hosting",
    desc: "Creators can easily set up and manage high-stakes contests with custom rules and prize pools.",
    icon: <FaRocket className="text-red-500" />,
  },
  {
    title: "Secure Payments",
    desc: "Integrated Stripe payment gateway ensures safe transactions for both participants and creators.",
    icon: <FaShieldAlt className="text-blue-500" />,
  },
  {
    title: "Global Leaderboard",
    desc: "Track performance in real-time and see who's dominating the platform globally.",
    icon: <FaTrophy className="text-amber-500" />,
  },
  {
    title: "Community Driven",
    desc: "Engage with thousands of users, share submissions, and grow your personal brand.",
    icon: <FaUsers className="text-purple-500" />,
  },
];

const ServiceSection = () => {
  Aos.init()
  return (
    <section className="py-22 bg-[#0a0a0a]">
      <div data-aos="fade-right" className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">
            Our <span className="text-red-600">Services</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto uppercase text-xs font-bold tracking-[0.2em]">
            Empowering creators and competitors with professional tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#111] border border-gray-800 p-8 rounded-3xl hover:border-red-600/50 transition-all group"
            >
              <div className="text-3xl mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 italic">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
