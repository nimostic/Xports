import React, { use } from "react";
import { Link, useNavigate, useLocation } from "react-router"; 
import { AuthContext } from "../../Provider/AuthContext";
import AngledButton from "../../Components/AngledButton";
import Loading from "../../Components/Loading";
import Aos from "aos";
import "aos/dist/aos.css";

const PopularContests = ({ contests, isLoading }) => {
  Aos.init();

  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <section className="py-24 bg-base-100 text-base-content overflow-hidden transition-colors duration-500">
      <div data-aos="zoom-in-out" className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
          <div>
            
            <h2 className="text-4xl text-base-content uppercase italic font-black tracking-tighter leading-none">
              Popular <span className="text-primary">Contests</span>
            </h2>
            <div className="h-2 w-20 bg-primary mt-4 rounded-full mx-auto md:mx-0"></div>
          </div>
          <Link to="/all-contests">
            <AngledButton text="Show All" />
          </Link>
        </div>

        {/* Contest Cards Grid */}
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contests.slice(0, 6).map((contest) => (
              <div
                key={contest._id}
               
                className="bg-base-100 border border-base-300 rounded-2xl overflow-hidden hover:border-primary/50 transition-all group shadow-xl flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={contest.bannerImage}
                    alt={contest.contestName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                 
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {contest.contestType}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-base-content leading-tight group-hover:text-primary transition-colors">
                      {contest.contestName}
                    </h3>
                    <div className="text-right">
                      <span className="block text-primary font-black text-xl">
                        {contest.participantsCount || 0}
                      </span>
                    
                      <span className="text-[10px] text-base-content/80 uppercase font-bold tracking-widest">
                        Participants
                      </span>
                    </div>
                  </div>

                  <p className="text-base-content/70 text-sm mb-6 line-clamp-3">
                    {contest.description}
                  </p>

                  <div className="mt-auto">
                    <Link
                      to={`/contest-details/${contest._id}`}
                      state={location.pathname}
                    >
                     
                      <button className="w-full bg-base-200 hover:bg-primary text-base-content hover:text-white font-bold py-3 rounded-xl border border-base-300 hover:border-primary transition-all duration-300 active:scale-95 shadow-sm">
                        View Details
                      </button>
                    </Link>
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

export default PopularContests;