import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  console.log("Received request");

  try {
    const reqData = await req.json();
    console.log("Request Data:", reqData);

    if (!reqData.productId) {
      return new Response(
        JSON.stringify({ message: "productId is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Making request to LemonSqueezy API");
    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes:{
             checkout_data:{
              custom:{
                 user_id:"123"
              },
            },
            //user_email:`${reqData.email}`,
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: process.env.LEMON_SQUEEZY_STORE_ID.toString(),
              },
            },
            variant: {
              data: {
                type: "variants",
                id: reqData.productId.toString(),
              },
            },
          },
          user_email: "chandancheripallyssr@gmail.com",
        },
      }),
    });

    console.log("API response:", await response.clone().text());

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error: ${response.status} - ${error}`);
    }

    const responseData = await response.json();
    const checkoutUrl = responseData.data.attributes.url;
     console.log(responseData.data)
     console.log(checkoutUrl)
    // return new Response(
    //   JSON.stringify({ checkoutUrl }),
    //   { status: 200, headers: { "Content-Type": "application/json" } }
    // );
    return NextResponse.json({checkoutUrl})
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred" })
  }
  
  
}
