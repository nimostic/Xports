import React, { useState, useContext, useEffect } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthContext";
import contestTypes from "../../public/ContestTypes.json";
import Loading from "../Components/Loading";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import Aos from "aos";

const AllContests = () => {
  useEffect(() => {
    Aos.init();
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

  // Tanstack Query
  const { data: { contests = [], total = 0 } = {}, isLoading } = useQuery({
    queryKey: ["contests", currentPage, selectedType, searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests?limit=${limit}&skip=${
          currentPage * limit
        }&type=${selectedType}&search=${searchText}&status=confirmed`,
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

          {/* Search Input - Dynamic Border & BG */}
          <div className="relative group w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              value={searchText}
              onChange={handleSearch}
              placeholder="Find your next challenge..."
              className="input w-full bg-base-200 border-base-300 focus:border-primary pl-12 h-14 rounded-2xl transition-all shadow-lg outline-none"
            />
          </div>
        </div>

        {/* Categories / Tabs */}
        <div className="flex justify-center flex-wrap gap-3 mb-16">
          <button
            onClick={() => handleTypeChange("All")}
            className={`px-8 py-3 rounded-xl border transition-all duration-300 uppercase text-[10px] font-bold tracking-[0.2em] ${
              selectedType === "All"
                ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                : "border-base-300 text-base-content/60 hover:border-primary/50 bg-base-100"
            }`}
          >
            All
          </button>
          {contestTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeChange(type.value)}
              className={`px-8 py-3 rounded-xl border transition-all duration-300 uppercase text-[10px] font-bold tracking-[0.2em] ${
                selectedType === type.value
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                  : "border-base-300 text-base-content/60 hover:border-primary/50 bg-base-100"
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
          <div className="text-center py-32 border-2 border-dashed border-base-300 rounded-4xl bg-base-200/30">
            <h3 className="text-2xl text-base-content/40 uppercase italic font-bold tracking-widest">
              No contests found!
            </h3>
            <p className="text-base-content/30 mt-2">
              Try a different category or search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {contests.map((contest) => (
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

        {/* Pagination Section */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-24">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn btn-circle bg-base-200 border-base-300 text-base-content hover:bg-primary hover:text-white disabled:opacity-30"
            >
              ❮
            </button>

            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-12 h-12 rounded-full font-black transition-all ${
                  currentPage === page
                    ? "bg-primary text-white scale-110 shadow-xl shadow-primary/30"
                    : "bg-base-200 text-base-content/60 hover:bg-base-300"
                }`}
              >
                {page + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages - 1}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn btn-circle bg-base-200 border-base-300 text-base-content hover:bg-primary hover:text-white disabled:opacity-30"
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
