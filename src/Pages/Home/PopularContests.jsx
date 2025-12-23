import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import AngledButton from "../../Components/AngledButton";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PopularContests = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { data: { contests = [], total = 0 } = {}, isLoading } = useQuery({
    queryKey: ["popular-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });
  // console.log(contests[0]);
  if (isLoading)
    return <div className="text-center py-20 text-white">Loading...</div>;

  const handleDetailsClick = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/contest-details/${id}`);
    }
  };

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white uppercase tracking-tighter">
              Popular <span className="text-primary">Contests</span>
            </h2>
            <div className="h-1 w-20 bg-primary mt-2"></div>
          </div>
          <Link to="/all-contests">
            <AngledButton text="Show All" />
          </Link>
        </div>

        {/* Contest Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contests.slice(0, 6).map((contest) => (
            <div
              key={contest._id}
              className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-all group shadow-xl"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={contest.bannerImage}
                  alt={contest.contestName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-primary/30">
                  {contest.contestType}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {contest.contestName}
                  </h3>
                  <div className="text-right">
                    <span className="block text-primary font-bold text-lg">
                      {contest.participantsCount || 0}
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase">
                      Participants
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-6">
                  {contest.description?.slice(0, 100)}...
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <button
                    onClick={() => handleDetailsClick(contest._id)}
                    className="w-full bg-white/5 hover:bg-primary text-white font-bold py-3 rounded-xl border border-white/10 hover:border-primary transition-all duration-300"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularContests;
