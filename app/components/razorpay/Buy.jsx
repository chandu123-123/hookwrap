"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Buy = ({ makePayment }) => {
  const useremail = useSelector((state) => state.counter.email);
 // const userpaid = useSelector((state) => state.counter.paid);
 const { data: session } = useSession();
  const [isLoading, setisLoading] = useState(false);
  const [load,setload]=useState("")
  const [message, setmessage] = useState("");
const router=useRouter()

  const verifying = () => {
  
    if (session?.user?.email?.length == 0) {
      setload("")
      setmessage("Please login in");
      
      setTimeout(async () => {
        setmessage("");
        //console.log("hellllo")
        router.push("/sign-in")
      }, 2000);
    } else {
     
      // console.log("hello")
   
        makePayment({ productId: "FresherResume" });
      
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-3">
        <button
          onClick={() => {
            setload("helllooo")
            verifying();
          }}
          disabled={isLoading}
          className={`btn btn-outline btn-primary ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
         Buy Now
        </button>
      </div>
      {message && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>{message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buy;
