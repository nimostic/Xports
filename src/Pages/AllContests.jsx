import React, { useState, useContext } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthContext";
import AngledButton from "../Components/AngledButton";
import contestTypes from "../../public/ContestTypes.json";
import Loading from "../Components/Loading";
import { FaSearch, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router";

const AllContests = () => {
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedType, setSelectedType] = useState("All");
  const [searchText, setSearchText] = useState("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Tanstack Query for Fetching Data
  const { data: { contests = [], total = 0 } = {}, isLoading } = useQuery({
    queryKey: ["contests", currentPage, selectedType, searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests?limit=${limit}&skip=${currentPage * limit}&type=${selectedType}&searchText=${searchText}&status=confirmed`
      );
      return res.data;
    },
  });

  const totalPages = Math.ceil(total / limit);
  const pages = [...Array(totalPages).keys()];

  // Handlers
  const handleDetailsClick = (id) => {
    user ? navigate(`/contest-details/${id}`) : navigate("/login");
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(0); // Reset pagination on filter change
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(0); // Reset pagination on search
  };

  return (
    <section className="py-20 bg-[#0a0a0a] min-h-screen text-white">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-5xl font-black uppercase tracking-tighter italic">
              All <span className="text-primary">Contests</span>
            </h2>
            <div className="h-1.5 w-24 bg-primary mt-3 rounded-full mx-auto md:mx-0"></div>
          </div>
          
          {/* Search Input */}
          <div className="relative group w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              value={searchText}
              onChange={handleSearch}
              placeholder="Find your next challenge..."
              className="input w-full bg-[#111] border-gray-800 focus:border-primary pl-12 h-14 rounded-2xl transition-all focus:ring-1 focus:ring-primary/20 outline-none shadow-2xl"
            />
          </div>
        </div>

        {/* Categories / Tabs */}
        <div className="flex justify-center flex-wrap gap-3 mb-16">
          <button
            onClick={() => handleTypeChange("All")}
            className={`px-8 py-3 rounded-xl border transition-all duration-300 font-black uppercase text-[10px] tracking-[0.2em] ${
              selectedType === "All" ? "bg-primary border-primary text-black" : "border-gray-800 text-gray-400 hover:border-primary/50"
            }`}
          >
            All
          </button>
          {contestTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeChange(type.value)}
              className={`px-8 py-3 rounded-xl border transition-all duration-300 font-black uppercase text-[10px] tracking-[0.2em] ${
                selectedType === type.value ? "bg-primary border-primary text-black" : "border-gray-800 text-gray-400 hover:border-primary/50"
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
          <div className="text-center py-32 border border-dashed border-gray-800 rounded-3xl">
            <h3 className="text-gray-600 text-2xl font-black uppercase italic tracking-widest">
              No contests matched your criteria!
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {contests.map((contest) => (
              <div
                key={contest._id}
                className="bg-[#111] border border-gray-800/50 rounded-4xl overflow-hidden hover:border-primary/40 transition-all group shadow-2xl flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={contest.bannerImage}
                    alt={contest.contestName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-5 left-5 bg-primary text-black px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">
                    {contest.contestType}
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-8 grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-100 group-hover:text-white transition-colors leading-tight">
                      {contest.contestName}
                    </h3>
                    <div className="bg-[#1a1a1a] p-3 rounded-2xl text-center min-w-[70px] border border-gray-800">
                      <span className="block text-primary font-black text-xl leading-none">
                        {contest.participantsCount || 0}
                      </span>
                      <span className="text-[8px] text-gray-500 uppercase font-bold tracking-tighter">
                        Joined
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm mb-8 line-clamp-2">
                    {contest.description}
                  </p>

                  <div className="mt-auto">
                    <button
                      onClick={() => handleDetailsClick(contest._id)}
                      className="w-full bg-[#1a1a1a] group-hover:bg-primary text-white group-hover:text-black font-black py-4 rounded-2xl border border-gray-800 group-hover:border-primary transition-all duration-500 uppercase text-xs tracking-widest italic"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Section */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-20">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn btn-circle bg-[#111] border-gray-800 text-white hover:bg-primary hover:text-black disabled:opacity-20"
            >
              ❮
            </button>

            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-12 h-12 rounded-full font-bold transition-all ${
                  currentPage === page ? "bg-primary text-black scale-110 shadow-lg shadow-primary/20" : "bg-[#111] text-gray-500 hover:text-white"
                }`}
              >
                {page + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages - 1}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn btn-circle bg-[#111] border-gray-800 text-white hover:bg-primary hover:text-black disabled:opacity-20"
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