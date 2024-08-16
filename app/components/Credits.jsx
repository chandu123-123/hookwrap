"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { update } from "@/store/createslice";

const CreditsDisplay = () => {
  const { data: session } = useSession();
  const credits = useSelector((state) => state.counter.credits);
  const dispatch = useDispatch();
  const [userCredits, setUserCredits] = useState(credits);

  useEffect(() => {
    // Fetch credits when session is active
    if (session?.user?.email) {
      const fetchCredits = async () => {
        try {
          const response = await fetch('/api/credits', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: session.user.email }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch credits');
          }

          const data = await response.json();
          setUserCredits(data.credits);
          dispatch(update(data.credits)); // Update the credits in Redux store
        } catch (error) {
          console.error('Error fetching credits:', error);
        }
      };

      fetchCredits();
    }
  }, [session, dispatch]);

  // Listen for updates to credits from Redux
  useEffect(() => {
    setUserCredits(credits);
  }, [credits]);

  if (!session) {
    return null; // Don't render anything if no session
  }

  return (
    <div className="credits-display">
      <p>Your Credits: {userCredits}</p>
    </div>
  );
};

export default CreditsDisplay;
