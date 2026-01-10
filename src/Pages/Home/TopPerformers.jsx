import React from "react";
import { FaCrown, FaFire, FaTrophy, FaMedal } from "react-icons/fa";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Loading from "../../Components/Loading";

// const demoPerformers = [
//   {
//     _id: "1",
//     name: "Alex 'Shadow' Rivera",
//     image: "https://i.pravatar.cc/150?u=1",
//     totalWins: 42,
//     totalEarnings: 15400,
//     rank: 1,
//   },
//   {
//     _id: "2",
//     name: "Sarah Jenkins",
//     image: "https://i.pravatar.cc/150?u=2",
//     totalWins: 38,
//     totalEarnings: 12100,
//     rank: 2,
//   },
//   {
//     _id: "3",
//     name: "David 'Code' Smith",
//     image: "https://i.pravatar.cc/150?u=3",
//     totalWins: 35,
//     totalEarnings: 9800,
//     rank: 3,
//   },
// ];

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
    <section className="py-24 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
              Elite <span className="text-primary">Hall of Fame</span>
            </h2>
            <div className="h-2 w-40 bg-primary my-4 rounded-full"></div>
          </div>
          <p className="text-gray-500 max-w-sm text-sm font-bold uppercase tracking-widest leading-relaxed">
            Recognizing the ultimate champions who dominated the arena this
            season.
          </p>
        </div>

        {/* Leaderboard Cards */}
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            {topPerformers.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative group ${
                  index === 0 ? "md:-translate-y-10 order-first md:order-0" : ""
                }`}
              >
                {/* Glassmorphism Card */}
                <div
                  className={`relative p-10 rounded-[50px] border backdrop-blur-3xl transition-all duration-700 ${
                    index === 0
                      ? "bg-linear-to-br from-primary/20 via-black to-black border-primary shadow-[0_0_50px_rgba(244,14,8,0.15)]"
                      : "bg-[#111]/50 border-white/5 hover:border-primary/30"
                  }`}
                >
                  {/* Rank Badge */}
                  <div
                    className={`absolute -top-6 left-12 w-12 h-12 rounded-2xl rotate-12 flex items-center justify-center text-black font-black text-xl shadow-2xl transition-transform group-hover:rotate-0 ${
                      index === 0 ? "bg-primary shadow-primary/40" : "bg-white"
                    }`}
                  >
                    #{index+1}
                  </div>

                  {/* Profile Image with Ring */}
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative">
                      <div
                        className={`p-1.5 rounded-full mb-6 ${
                          index === 0
                            ? "bg-linear-to-tr from-primary to-yellow-500"
                            : "bg-white/10"
                        }`}
                      >
                        <img
                          src={user.photo}
                          className="w-28 h-28 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          alt={user.name}
                        />
                      </div>
                      {index === 0 && (
                        <FaCrown className="absolute -top-8 -right-4 text-yellow-400 text-4xl animate-bounce" />
                      )}
                    </div>

                    <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">
                      {user.name}
                    </h3>
                  </div>

                  {/* Stats Grid */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <FaFire className="text-orange-500" />
                        <span className="text-xs font-bold uppercase text-gray-400">
                          Total Wins
                        </span>
                      </div>
                      <span className="font-black text-xl">
                        {user.totalWins}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <FaTrophy className="text-yellow-500" />
                        <span className="text-xs font-bold uppercase text-gray-400">
                          Earnings
                        </span>
                      </div>
                      <span className="font-black text-xl text-green-500">
                        ${user.totalEarnings.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative Glow */}
                {index === 0 && (
                  <div className="absolute -inset-10 bg-primary/10 blur-[100px] -z-10 rounded-full"></div>
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
