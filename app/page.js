import React from "react";

import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Pricing2 from "./components/Pricing2";
import Accordtion from "./components/Accordtion";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
export const metadata = {
  title: "HookWrap",
  description: "Unlock the power of AI to create compelling and engaging hooks for your social media content. Our AI-driven tool crafts hooks that resonate with your audience, making your posts feel as authentic as those written by a human. Boost your engagement, attract more followers, and watch your social media presence soar with expertly designed hooks tailored to captivate and convert.",
};
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
