import React from "react";
import Banner from "../../Components/Banner";
import PopularContests from "./PopularContests";
import WinnerSection from "./WinnerSection";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TopPerformers from "./TopPerformers";
import Categories from "./Categories";
import Partners from "./Partners";
import HowItWorks from "./HowItWorks";
import Services from "./Services";
import Newsletter from "./Newsletter";
import Testimonials from "./Testimonials";
import CTA from "./CTA";


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
      <Partners></Partners>
      <Categories></Categories>
      <PopularContests contests={contests} isLoading={isLoading}></PopularContests>
      <WinnerSection total={total}></WinnerSection>
      <TopPerformers></TopPerformers>
      <HowItWorks></HowItWorks>
      <Services></Services>
      <Testimonials></Testimonials>
      <CTA></CTA>
      <Newsletter></Newsletter>
    </>
  );
};

export default Home;
