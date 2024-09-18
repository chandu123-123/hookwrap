"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { update } from "@/store/createslice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreditsDisplay = () => {
  const { data: session } = useSession();
  const credits = useSelector((state) => state.counter.credits);
  const dispatch = useDispatch();
  const [userCredits, setUserCredits] = useState(credits);
  const prevCreditsRef = useRef(credits);

  useEffect(() => {
    console.log(session?.user?.email)
    if (session?.user?.email) {
      const fetchCredits = async () => {
        try {
       const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}/api/credits?email=${session.user.email}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});

          if (!response.ok) {
            throw new Error('Failed to fetch credits');
          }

          const data = await response.json();
          setUserCredits(data.credits);
          dispatch(update(data.credits)); // Update the credits in Redux store
        } catch (error) {
          console.error('Error fetching credits:', error);
          // toast.error('Error fetching credits', {
          //   position: "top-right",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: false,
          //   pauseOnHover: true,
          //   draggable: false,
          //   progress: undefined,
          //   theme: "dark",
          // });
        }
      };

      fetchCredits();
    }
  }, [session, dispatch]);

  useEffect(() => {
    if (credits !== prevCreditsRef.current) { // Only show toast if credits have changed
      setUserCredits(credits);
      prevCreditsRef.current = credits; // Update the previous credits reference
    }
  }, [credits]);

  if (!session) {
    return null; // Don't render anything if no session
  }

  return (
    <div className="credits-display">
      <ToastContainer />
      <p>Credits: {userCredits}</p>
    </div>
  );
};

export default CreditsDisplay;
