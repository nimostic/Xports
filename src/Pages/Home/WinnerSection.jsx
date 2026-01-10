import React from "react";
import { FaTrophy, FaMedal, FaCrown, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";

const WinnerSection = ({ total }) => {
  const axiosInstance = useAxios();
  const { data: winners = [] } = useQuery({
    queryKey: ["winners"],
    queryFn: async () => {
      const res = await axiosInstance.get("/winners");
      return res.data;
    },
  });

  const prizeMoney = winners.reduce((a, c) => a + c.prizeMoney, 0);

  const { data: participations = [] } = useQuery({
    queryKey: ["participations"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/participate`);
      return res.data;
    },
  });

  const successRate = ((winners.length / participations.length) * 100).toFixed(
    1
  );

  return (
    <section className="py-8 md:py-20 bg-[#050505] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-4">
        {/* Header Part */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
            Where Champions <span className="text-primary">Rise</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto font-medium">
            Join thousands of creators who turned their skills into victory.
            Real people, real prizes, real innovation.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            {
              icon: <FaUsers />,
              label: "Total Winners",
              value: `${winners.length}+`,
            },
            {
              icon: <FaTrophy />,
              label: "Prize Distributed",
              value: `$${prizeMoney}+`,
            },
            { icon: <FaMedal />, label: "Contests Hosted", value: `${total}+` },
            {
              icon: <FaCrown />,
              label: "Success Rate",
              value: `${successRate}%`,
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#111] p-8 rounded-3xl border border-white/5 text-center group hover:border-primary/30 transition-all duration-500"
            >
              <div className="text-primary text-3xl mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h4 className="text-3xl font-black text-white">{stat.value}</h4>
              <p className="text-gray-500 text-xs uppercase font-bold tracking-widest mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Winners Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex justify-center items-center gap-2 text-primary font-black uppercase tracking-widest text-sm mb-8"
        >
          <FaCrown /> Recent Winners
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {winners.slice(0, 6).map((winner, index) => (
            <motion.div
              key={winner._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-secondary rounded-[40px] blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

              <div className="relative bg-[#0a0a0a] rounded-[40px] p-8 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 p-1">
                    <img
                      src={winner.winnerPhoto}
                      alt={winner.winnerName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-black p-2 rounded-full text-sm">
                    <FaTrophy />
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white">
                  {winner.winnerName}
                </h3>
                <p className="text-primary font-bold text-sm mb-4">
                  {winner.contestName}
                </p>

                <div className="bg-white/5 w-full py-4 rounded-2xl border border-white/5">
                  <span className="text-[10px] uppercase text-gray-500 font-black tracking-[0.2em] block mb-1">
                    Won Prize
                  </span>
                  <span className="text-2xl font-black text-green-500">
                    ${winner.prizeMoney}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="inline-block p-1 rounded-full bg-white/5 border border-white/10 mb-8">
            <p className="px-6 py-2 text-gray-300 text-sm font-medium italic">
              "Every master was once a beginner.{" "}
              <span className="text-primary font-bold">
                Start your journey today!
              </span>
              "
            </p>
          </div>
          <br />
          <button className="bg-primary hover:bg-white text-black font-black uppercase px-12 py-5 rounded-2xl transition-all duration-300 tracking-tighter italic text-lg shadow-[0_0_30px_rgba(244,14,8,0.3)] hover:scale-105 active:scale-95">
            Join Next Contest
          </button>
        </div>
      </div>
    </section>
  );
};

export default WinnerSection;
