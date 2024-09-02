"use client"
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Link from 'next/link'
import 'react-toastify/dist/ReactToastify.css';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useDispatch, useSelector } from "react-redux";
import { update } from "@/store/createslice";
import { ToastContainer,toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
const Hero = () => {
  const router=useRouter()
  const [credits, setCredits] = useState(useSelector((state) => state.counter.credits));
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
 
  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      if (session?.user?.email) {
        try {
          console.log("hello")
          const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}/api/credits`, {
            method: 'POST', // Use POST method to send the body data
            headers: {
              'Content-Type': 'application/json', // Set the correct header
            },
            body: JSON.stringify({ email: session.user.email }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
          const data = await response.json();
          console.log(data)


      

          // // Dispatch action or update state with the fetched data
           dispatch(update(data.credits));
        } catch (error) {
          console.error('Error fetching credits:', error);
        }
       
      }
    };

    fetchData();
  }, [session]);



  const handleStartGenerating = () => {
    if (session?.user?.email) {
      router.push('/generate');
    } else {
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
  };

  return (
    
   <div >
     <ToastContainer/>
    <Navbar></Navbar>
     <div className='center flex flex-col items-center justify-center text-center '>
        <h1 className='text-[20px] bold uppercase mt-24'>Boost Your Engagement with AI-Powered Hooks</h1>
        <p className='mt-5'>Turn viewers into followers.</p>
        <button 
          onClick={handleStartGenerating}
          className='w-fit mt-5 bg-black p-3 rounded-lg text-white'
        >
          Start Generating
        </button>
     </div>
     <div className='text-center'>

     <h1 className='mt-16 text-5xl '>10x of ChatGpt</h1>
     </div>
     <div className='flex justify-center items-center p-10 '>
     <Image src={"/home/hero.jpg"} width={300} height={100} className='rounded-2xl ' alt='hero img'></Image>

     </div>
    
   </div>
  )
}

export default Hero
