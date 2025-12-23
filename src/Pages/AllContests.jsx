import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthContext";
import AngledButton from "../Components/AngledButton";
import contestTypes from "../../public/ContestTypes.json";
import Loading from "../Components/Loading";
const AllContests = () => {
  //for pagination
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedType, setSelectedType] = useState("All");

  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  //tanstack query
  const { data: { contests = [], total = 0 } = {}, isLoading } = useQuery({
    queryKey: ["contests", currentPage, selectedType],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests?limit=${limit}&skip=${
          currentPage * limit
        }&type=${selectedType}`
      );
      return res.data;
    },
  });

  const totalPages = Math.ceil(total / limit);
  const pages = [...Array(totalPages).keys()];

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
              All <span className="text-primary">Contests</span>
            </h2>
            <div className="h-1 w-20 bg-primary mt-2"></div>
          </div>
          <AngledButton text={contests.length}></AngledButton>
        </div>

        {/* tabs section  */}

        <div className="flex justify-center flex-wrap gap-3 mb-12">
          <button
            onClick={() => {
              setSelectedType("All");
              setCurrentPage(0);
            }}
            className={`px-6 py-2 rounded-full border transition-all duration-300 font-bold uppercase text-xs tracking-widest ${
              selectedType === "All"
                ? "bg-primary border-primary text-black"
                : "border-gray-800 text-gray-400 hover:border-primary hover:text-white"
            }`}
          >
            All
          </button>

          {/* Dynamic Tabs from JSON */}
          {contestTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => {
                setSelectedType(type.value);
                setCurrentPage(0);
              }}
              className={`px-6 py-2 rounded-full border transition-all duration-300 font-bold uppercase text-xs tracking-widest ${
                selectedType === type.value
                  ? "bg-primary border-primary text-black"
                  : "border-gray-800 text-gray-400 hover:border-primary hover:text-white"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {contests.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <h3 className="text-gray-500 text-2xl font-semibold italic">
                    No contests found in this category!
                  </h3>
                </div>
              ) : (
                <>
                  {contests.map((contest) => (
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
                </>
              )}
            </div>
          </>
        )}

        {/* Contest Cards Grid */}

        {/* pagination button start  */}
        {totalPages > 1 && (
          <div className="flex justify-center flex-wrap gap-3 mt-12">
            {/* Previous Button */}
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn btn-outline border-gray-700 text-white hover:bg-primary disabled:opacity-30"
            >
              Prev
            </button>

            {/* Numbered Buttons */}
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`btn ${
                  currentPage === page
                    ? "btn-primary"
                    : "btn-outline border-gray-700 text-white"
                }`}
              >
                {page + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              disabled={currentPage === totalPages - 1}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn btn-outline border-gray-700 text-white hover:bg-primary disabled:opacity-30"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllContests;
