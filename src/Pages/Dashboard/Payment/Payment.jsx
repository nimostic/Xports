import { useQuery } from "@tanstack/react-query";
import React, { use, useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthContext";
import AngledButton from "../../../Components/AngledButton";
import { RefreshCw } from "lucide-react";


const Payment = ({ id }) => {
    //   console.log(id);
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
 

  const { data: contest = {} } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`contests/${id}`);
      return res.data[0];
    },
  });



  //payment
  const handlePayment = async () => {
    console.log(contest);
    const submitInfo = {
      price: contest.price,
      contestId: contest._id,
      participantEmail: user?.email,
      contestName: contest.contestName,
    };
    const res = await axiosSecure.post("/create-checkout-session", submitInfo);
    // console.log(res.data);
    window.location.assign(res.data.url);
  };

  return (
    <div>
      <AngledButton
        onClick = {()=>handlePayment()}
        text="Try Again"
      >
        <RefreshCw size={18} /> 
      </AngledButton>
    </div>
  );
};

export default Payment;
