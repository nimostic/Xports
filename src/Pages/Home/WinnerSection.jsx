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

  const successRate = participations.length > 0 
    ? ((winners.length / participations.length) * 100).toFixed(1) 
    : 0;

  return (
    <section className="py-24 bg-base-100 text-base-content relative overflow-hidden transition-colors duration-500">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-4">
        {/* Header Part */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl text-base-content uppercase italic font-black tracking-tighter">
            Where Champions <span className="text-primary">Rise</span>
          </h2>
          
          <p className="text-base-content/60 mt-4 max-w-2xl mx-auto font-medium">
            Join thousands of creators who turned their skills into victory.
            Real people, real prizes, real innovation.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {[
            { icon: <FaUsers />, label: "Total Winners", value: `${winners.length}+` },
            { icon: <FaTrophy />, label: "Prize Distributed", value: `$${prizeMoney.toLocaleString()}+` },
            { icon: <FaMedal />, label: "Contests Hosted", value: `${total}+` },
            { icon: <FaCrown />, label: "Success Rate", value: `${successRate}%` },
          ].map((stat, idx) => (
            <div
              key={idx}
              
              className="bg-base-200/50 p-8 rounded-3xl border border-base-300 text-center group hover:border-primary/30 transition-all duration-500 shadow-sm"
            >
              <div className="text-primary text-3xl mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h4 className="text-3xl font-black text-base-content">
                {stat.value}
              </h4>
              <p className="text-base-content/50 text-[10px] uppercase font-bold tracking-widest mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Winners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex justify-center items-center gap-2 text-base-content uppercase tracking-widest font-bold text-sm mb-12"
        >
          <FaCrown className="text-primary" /> Recent Winners
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
              {/* Animated Glow Border */}
              <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-[#830402] rounded-[40px] blur opacity-10 group-hover:opacity-100 transition duration-1000"></div>

              
              <div className="relative bg-base-100 border border-base-300 rounded-[40px] p-8 flex flex-col items-center text-center shadow-xl">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 p-1 bg-base-200">
                    <img
                      src={winner.winnerPhoto}
                      alt={winner.winnerName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full text-sm shadow-lg">
                    <FaTrophy />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-base-content">
                  {winner.winnerName}
                </h3>
                <p className="text-primary font-bold text-sm mb-6">
                  {winner.contestName}
                </p>

                
                <div className="bg-base-200 w-full py-4 rounded-2xl border border-base-300">
                  <span className="text-[10px] uppercase text-base-content/50 tracking-[0.2em] block mb-1 font-bold">
                    Won Prize
                  </span>
                  <span className="text-2xl font-black text-green-500">
                    ${winner.prizeMoney.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="inline-block p-1 rounded-full bg-base-200 border border-base-300 mb-8">
            <p className="px-6 py-2 text-base-content/70 text-sm font-medium italic">
              "Every master was once a beginner.{" "}
              <span className="text-primary font-bold">
                Start your journey today!
              </span>
              "
            </p>
          </div>
          <br />
          <button className="bg-primary hover:bg-[#830402] text-white uppercase px-12 py-5 rounded-2xl transition-all duration-300 font-black tracking-tighter italic text-lg shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95">
            Join Next Contest
          </button>
        </div>
      </div>
    </section>
  );
};

export default WinnerSection;