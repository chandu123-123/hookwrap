"use client"

import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pricing from './Pricing'
import { useSession } from 'next-auth/react';
const Pricing2 = () => {
  const { data: session } = useSession();
  const handlesubmit = async () => {
    if(!session?.user?.email){
      toast.error('Please Login', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        });
    }
    else{
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}/api/purchaseproduct`, {
        method: "POST",
        body: JSON.stringify({ productId: "496586" ,email:`${session?.user?.email}`}) // Convert your payload to a JSON string
      });
      
    //  console.log(res)
      const res = await response.json();
      console.log(res);

      window.open(res.checkoutUrl,"_blank")
    // Optionally, update state with response
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  };

  return (
    <div>
       <ToastContainer />
   
   
   
      <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
        <div class="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div class="mx-auto max-w-xs px-8">
            <p class="text-base font-semibold text-gray-600">Most popular</p>
            <p class="mt-6 flex items-baseline justify-center gap-x-2">
              <span class="text-5xl font-bold tracking-tight text-gray-900">100</span>
              <span class="text-sm font-semibold leading-6 tracking-wide text-gray-600 text-[40px]">₹</span>
            </p>
            <div  class="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <button onClick={handlesubmit}>Buy Now</button>
            </div>
            <p class="mt-6 text-xs leading-5 text-gray-600">Get 20 Credits for one Payment.</p>
            <p class="mt-3 text-xs leading-5 text-gray-600">And make your content Viral</p>
            <p class="mt-3 text-xs leading-5 text-red-600">Use Login email for Payment</p>
          </div>
        </div>
      </div>
    </div>
 

  )
}

export default Pricing2
