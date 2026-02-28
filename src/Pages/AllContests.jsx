import React, { useState, useEffect } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import contestTypes from "../../public/ContestTypes.json";
import Loading from "../Components/Loading";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import Aos from "aos";
import "aos/dist/aos.css";

const AllContests = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const limit = 10;
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // URL Params parsing
  const queryParams = new URLSearchParams(location.search);
  const searchFromURL = queryParams.get("search") || "";

  const [searchText, setSearchText] = useState(searchFromURL);
  const [selectedType, setSelectedType] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);

  // Tanstack Query - Status added as confirmed,completed
  const { data: { contests = [], total = 0 } = {}, isLoading } = useQuery({
    queryKey: ["contests", currentPage, selectedType, searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests?limit=${limit}&skip=${
          currentPage * limit
        }&type=${selectedType}&search=${searchText}&status=confirmed,completed`
      );
      return res.data;
    },
  });

  const totalPages = Math.ceil(total / limit);
  const pages = [...Array(totalPages).keys()];

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(0);
    setSearchText("");
    navigate("/all-contests", { replace: true });
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(0);
  };

  return (
    <section className="py-24 bg-base-100 text-base-content transition-colors duration-500 min-h-screen">
      <div data-aos="fade-up" className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-4xl text-base-content uppercase italic font-black tracking-tighter leading-none">
              All <span className="text-primary">Contests</span>
            </h2>
            <div className="h-1.5 w-24 bg-primary mt-3 rounded-full mx-auto md:mx-0"></div>
          </div>

          {/* Search Input */}
          <div className="relative group w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              value={searchText}
              onChange={handleSearch}
              placeholder="Find your next challenge..."
              className="input w-full bg-base-200 border-base-300 focus:border-primary pl-12 h-14 rounded-2xl transition-all shadow-lg outline-none font-medium"
            />
          </div>
        </div>

        {/* Categories / Tabs */}
        <div className="flex justify-center flex-wrap gap-3 mb-16">
          <button
            onClick={() => handleTypeChange("All")}
            className={`px-8 py-3 rounded-xl border transition-all duration-300 uppercase text-[10px] font-black tracking-[0.2em] italic ${
              selectedType === "All"
                ? "bg-primary border-primary text-white shadow-xl shadow-primary/20"
                : "border-base-300 text-base-content/60 hover:border-primary/50 bg-base-200/50"
            }`}
          >
            All
          </button>
          {contestTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeChange(type.value)}
              className={`px-8 py-3 rounded-xl border transition-all duration-300 uppercase text-[10px] font-black tracking-[0.2em] italic ${
                selectedType === type.value
                  ? "bg-primary border-primary text-white shadow-xl shadow-primary/20"
                  : "border-base-300 text-base-content/60 hover:border-primary/50 bg-base-200/50"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        {/* Content Section */}
        {isLoading ? (
          <Loading />
        ) : contests.length === 0 ? (
          <div className="text-center py-32 border-2 border-dashed border-base-300 rounded-[3rem] bg-base-200/30">
            <h3 className="text-2xl text-base-content/40 uppercase italic font-black tracking-widest">
              No contests found!
            </h3>
            <p className="text-base-content/30 mt-2 font-bold uppercase text-xs tracking-widest">
              Try a different category or search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {contests.map((contest) => (
              <div
                key={contest._id}
                className="bg-base-200/40 border border-base-300 dark:border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/50 transition-all group shadow-2xl flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={contest.bannerImage}
                    alt={contest.contestName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* LEFT SIDE: Status Badge (Confirmed/Completed) */}
                  <div className="absolute top-5 left-5">
                    {contest.status === "completed" ? (
                      <span className="bg-neutral/80 backdrop-blur-md text-neutral-content px-4 py-1.5 rounded-full text-[9px] font-black uppercase italic tracking-[0.2em] border border-white/10">
                        Finished
                      </span>
                    ) : (
                      <span className="bg-green-600/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase italic tracking-[0.2em] border border-white/20 animate-pulse">
                        Live Now
                      </span>
                    )}
                  </div>

                  {/* RIGHT SIDE: Type Badge */}
                  <div className="absolute top-5 right-5 bg-primary/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase italic tracking-[0.2em]">
                    {contest.contestType}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8 flex flex-col grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black text-base-content uppercase italic tracking-tighter leading-none group-hover:text-primary transition-colors">
                      {contest.contestName}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="block text-primary font-black text-2xl leading-none italic">
                        {contest.participantsCount || 0}
                      </span>
                      <span className="text-[9px] text-base-content/40 uppercase font-black tracking-widest italic">
                        Participants
                      </span>
                    </div>
                  </div>

                  <p className="text-base-content/60 text-sm mb-8 line-clamp-2 font-medium">
                    {contest.description}
                  </p>

                  <div className="mt-auto">
                    <Link
                      to={`/contest-details/${contest._id}`}
                      state={location.pathname}
                    >
                      <button className={`w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all italic shadow-md active:scale-95 ${
                        contest.status === "completed"
                        ? "bg-base-300 text-base-content/40 border border-base-content/5"
                        : "bg-base-100 hover:bg-primary text-base-content hover:text-white border border-base-300 hover:border-primary"
                      }`}>
                        {contest.status === "completed" ? "View Leaderboard" : "Join Contest"}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Section */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-24">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-base-200 border border-base-300 text-base-content hover:bg-primary hover:text-white disabled:opacity-20 transition-all font-black"
            >
              ❮
            </button>

            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-12 h-12 rounded-full font-black italic transition-all ${
                  currentPage === page
                    ? "bg-primary text-white scale-125 shadow-2xl shadow-primary/40"
                    : "bg-base-200 text-base-content/40 hover:bg-base-300"
                }`}
              >
                {page + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages - 1}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-base-200 border border-base-300 text-base-content hover:bg-primary hover:text-white disabled:opacity-20 transition-all font-black"
            >
              ❯
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllContests;