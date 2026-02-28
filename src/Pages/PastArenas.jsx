import React, { useEffect } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
import { Link } from "react-router";
import { Trophy, Users, ArrowRight, History } from "lucide-react";
import Aos from "aos";

const PastArenas = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const { data: { contests = [] } = {}, isLoading } = useQuery({
    queryKey: ["completed-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests?status=completed&limit=20");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="min-h-screen bg-base-100 py-24 transition-colors duration-500">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div data-aos="fade-down" className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-2 rounded-full mb-6 border border-primary/20">
            <History size={16} className="animate-spin-slow" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">Legacy of Battles</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-base-content uppercase italic tracking-tighter leading-none mb-4">
            Past <span className="text-primary">Arenas</span>
          </h2>
          <p className="text-base-content/50 max-w-xl mx-auto font-bold uppercase text-[11px] tracking-widest italic">
            Relive the glory of finished competitions and explore the results of the champions.
          </p>
        </div>

        {/* Content Grid */}
        {contests.length === 0 ? (
          <div className="text-center py-32 opacity-20">
            <Trophy size={80} className="mx-auto mb-6" />
            <h3 className="text-2xl font-black uppercase italic">No Finished Contests Yet</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contests.map((contest) => (
              <div
                key={contest._id}
                data-aos="zoom-in-up"
                className="group relative bg-base-200/50 dark:bg-[#141414] border border-base-300 dark:border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/40 transition-all duration-500 shadow-2xl"
              >
                <div className="flex flex-col lg:flex-row h-full">
                  
                  {/* Image Part */}
                  <div className="relative w-full lg:w-48 h-48 lg:h-auto overflow-hidden shrink-0">
                    <img
                      src={contest.bannerImage}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                      alt={contest.contestName}
                    />
                    <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  {/* Details Part */}
                  <div className="p-8 flex flex-col justify-between grow">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] italic bg-primary/10 px-3 py-1 rounded-md border border-primary/20">
                          {contest.contestType}
                        </span>
                        <div className="flex items-center gap-1.5 text-base-content/40 text-[10px] font-black uppercase italic">
                          <Users size={12} /> {contest.participantsCount} Joined
                        </div>
                      </div>

                      <h3 className="text-2xl font-black text-base-content uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                        {contest.contestName}
                      </h3>
                      
                      {/* Winner Mini-Snippet */}
                      <div className="mt-4 flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                        <img src={contest.winnerPhoto} className="w-8 h-8 rounded-lg object-cover ring-2 ring-primary/30" alt="" />
                        <div>
                          <p className="text-[8px] text-base-content/40 font-black uppercase tracking-widest italic leading-none">Winner</p>
                          <p className="text-sm font-black italic text-base-content tracking-tight">{contest.winnerName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <Link
                        to={`/contest-details/${contest._id}`}
                        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-base-300 dark:bg-white/5 text-base-content font-black uppercase text-[10px] tracking-widest italic group-hover:bg-primary group-hover:text-primary-content transition-all shadow-lg"
                      >
                        View Results <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PastArenas;