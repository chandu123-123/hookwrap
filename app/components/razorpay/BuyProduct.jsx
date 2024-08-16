"use client";
import React, { Suspense, useEffect } from "react";
import Buy from "./Buy";
import { useRouter } from 'next/navigation';
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BuyProduct = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const useremail = session?.user?.email;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const makePayment = async ({ productId = null }) => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const key = process.env.RAZORPAY_API_KEY;

    // Make API call to the serverless API
    const data = await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}/api/razorpay`);
    const { order } = await data.json();

    const options = {
      key: key,
      name: "FresherResume",
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      description: "Payment for Downloading Resume",
      handler: async function (response) {
        
     
        const data = await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}/api/paymentverify`, {
          method: "POST",
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        const res = await data.json();

        if (res?.message === "success") {
         
        const cred=  await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}/api/credits`, {
            method: "POST",
            body: JSON.stringify({
              email:session?.user?.email
            }),
          });
             const credit=await cred.json();
          console.log(credit);
             toast.success(`Credits Added ${credit.credits} `, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
            });
   

           const res2= await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}/api/updatecredits`, {
              method: "POST",
              body: JSON.stringify({
                email:session?.user?.email
              }),
            });
             const cred2=await res2.json();
             console.log(cred2);
          


          router.push(`${process.env.NEXT_PUBLIC_LOCALURL}/`);
        }
      },
      prefill: {
        name: "FresherResume",
        email: useremail,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again");
    });
  };

  return (
    <div>
     <ToastContainer />
      <Suspense fallback={<Loading />}>
        <Buy makePayment={makePayment} />
      </Suspense>
    </div>
  );
};

export default BuyProduct;
