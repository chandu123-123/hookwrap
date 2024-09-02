import React from "react";

import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Pricing2 from "./components/Pricing2";
import Accordtion from "./components/Accordtion";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
const Page = () => {
  return (
    <div >
      <Hero></Hero>
      {/* <Claude></Claude> */}

      <div
        id="pricing"
        className="flex flex-col gap-5 justify-center items-center"
      >
        <h1 className="text-[3rem] font-bold">Pricing</h1>
        <Pricing2></Pricing2>
      </div>
      <Accordtion></Accordtion>
      {/* <Testimonials></Testimonials> */}
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Page;
