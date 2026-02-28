import React from "react";
import { FaCrown, FaFire, FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Loading from "../../Components/Loading";

const TopPerformers = () => {
  const axiosInstance = useAxios();
  const { data: topPerformers = [], isLoading } = useQuery({
    queryKey: "performers",
    queryFn: async () => {
      const res = await axiosInstance.get("top-performers");
      return res.data;
    },
  });

  return (
    <section className="py-24 bg-base-100 text-base-content overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-center md:text-left">
          <div className="w-full md:w-auto">
            <h2 className="text-4xl text-base-content uppercase italic font-black tracking-tighter leading-none">
              Elite <span className="text-primary">Hall of Fame</span>
            </h2>
            <div className="h-2 w-40 bg-primary my-4 rounded-full mx-auto md:mx-0"></div>
          </div>
          
          <p className="text-base-content/60 max-w-sm text-sm font-bold uppercase tracking-widest leading-relaxed">
            Recognizing the ultimate champions who dominated the arena this
            season.
          </p>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            {topPerformers.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative group ${
                  index === 0 ? "md:-translate-y-10 order-first md:order-0" : ""
                }`}
              >
                
                <div
                  className={`relative p-10 rounded-[50px] border backdrop-blur-3xl transition-all duration-700 ${
                    index === 0
                      ? "bg-linear-to-br from-primary/20 via-base-100 to-base-100 dark:via-black dark:to-black border-primary shadow-[0_0_50px_rgba(244,14,8,0.15)]"
                      : "bg-base-200/50 border-base-300 hover:border-primary/30 shadow-lg"
                  }`}
                >
                  {/* Rank Badge */}
                  <div
                    className={`absolute -top-6 left-12 w-12 h-12 rounded-2xl rotate-12 flex items-center justify-center text-xl shadow-2xl transition-transform group-hover:rotate-0 ${
                      index === 0 
                        ? "bg-primary text-white shadow-primary/40" 
                        : "bg-base-content text-base-100"
                    }`}
                  >
                    #{index + 1}
                  </div>

                  {/* Profile Image with Ring */}
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative">
                      <div
                        className={`p-1.5 rounded-full mb-6 ${
                          index === 0
                            ? "bg-linear-to-tr from-primary to-yellow-500 shadow-lg"
                            : "bg-base-300"
                        }`}
                      >
                        <img
                          src={user.photo}
                          className="w-28 h-28 rounded-full object-cover transition-all duration-700"
                          alt={user.name}
                        />
                      </div>
                      {index === 0 && (
                        <FaCrown className="absolute -top-8 -right-4 text-yellow-400 text-4xl animate-bounce" />
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-base-content tracking-tight group-hover:text-primary transition-colors">
                      {user.name}
                    </h3>
                  </div>

                  {/* Stats Grid */}
                  <div className="space-y-4">
                    
                    <div className="flex justify-between items-center bg-base-200 p-4 rounded-2xl border border-base-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <FaFire className="text-orange-500" />
                        <span className="text-[10px] font-black uppercase text-base-content/60">
                          Total Wins
                        </span>
                      </div>
                      <span className="text-base-content font-black text-xl">
                        {user.totalWins}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-base-200 p-4 rounded-2xl border border-base-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <FaTrophy className="text-yellow-500" />
                        <span className="text-[10px] font-black uppercase text-base-content/60">
                          Earnings
                        </span>
                      </div>
                      <span className="text-base-content font-black text-xl">
                        ${user.totalEarnings.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                
                {index === 0 && (
                  <div className="absolute -inset-10 bg-primary/10 blur-[100px] -z-10 rounded-full opacity-50 dark:opacity-100"></div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopPerformers;