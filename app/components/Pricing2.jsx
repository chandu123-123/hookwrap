"use client"

import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pricing from './Pricing'
import { useSession } from 'next-auth/react';
import { CreditCard } from 'lucide-react';
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
     // console.log(process.env.NEXT_PUBLIC_LEMON_SQUEEZY_VARIANT)
      
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}/api/purchaseproduct`, {
        method: "POST",
        body: JSON.stringify({ productId: `${process.env.NEXT_PUBLIC_LEMON_SQUEEZY_VARIANT}` ,email:`${session?.user?.email}`}) // Convert your payload to a JSON string
      });
       //496586
       //496584 origin
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
      <ToastContainer/>
  
      <div className="max-w-md w-full space-y-8">
        <div>
       
          <p className="mt-2 text-center text-sm text-gray-600">
            Get started with our most popular package
          </p>
        </div>
        <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h3 className="text-center text-2xl font-semibold text-gray-900">Premium Package</h3>
            <div className="mt-4 flex justify-center">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            <p className="mt-4 text-center text-5xl font-extrabold text-gray-900">
              ₹50
            </p>
          
            <ul className="mt-6 space-y-4">
              <li className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="ml-3 text-base text-gray-700">Make your content Viral</span>
              </li>
              <li className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="ml-3 text-base text-gray-700">Boost your Followers</span>
              </li>
              <li className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="ml-3 text-base text-gray-700"> Get 20 Credits for one Payment</span>
              </li>
            </ul>
          </div>
          <div className="px-6 py-4 bg-gray-50">
            <button
              onClick={handlesubmit}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    
    </div>
 

  )
}

export default Pricing2
