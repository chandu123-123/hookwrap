import React from "react";
import Pricing from "../components/Pricing";
import Pricing2 from "../components/Pricing2";

const page = () => {
  return (
    <div className="flex justify-center mt-[4rem] drop-shadow-lg ">
      <div className="card w-96 glass ">
        <div className="text-center p-3 bg-gray-300">
          <div className="font-bold uppercase text-[2rem]">Student Offer</div>
          <h1>Best Templates for Freshers</h1>
        </div>
        <div className="card-body flex justify-center flex-col items-center">
          <h2 className="card-title">
            <span className="font-bold text-[2rem] p-3">₹ 25</span>/ Life Time
          </h2>
         
         <Pricing2></Pricing2>
        </div>
      </div>
    </div>
  );
};

export default page;
