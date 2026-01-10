import React from "react";
import Banner from "../../Components/Banner";
import PopularContests from "./PopularContests";
import WinnerSection from "./WinnerSection";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TopPerformers from "./TopPerformers";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const { data: { contests = [], total = 0 } = {}, isLoading } = useQuery({
    queryKey: ["popular-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests?status=confirmed");
      return res.data;
    },
  });

  return (
    <>
      <Banner></Banner>
      <PopularContests contests={contests} isLoading={isLoading}></PopularContests>
      <WinnerSection total={total}></WinnerSection>
      <TopPerformers></TopPerformers>
    </>
  );
};

export default Home;
