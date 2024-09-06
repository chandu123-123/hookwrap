import { dbconnection } from '@/app/lib/database'; // Ensure this exports a function to connect to MongoDB
import { userlogin } from '@/app/lib/model'; 
import { NextResponse } from 'next/server';
export async function POST(req,res) {
    console.log("hello")
    const body=await req.json();
    await dbconnection();
    const {email}=body
    console.log(body)
    const user1=await userlogin.find({email})
    console.log(user1[0])
    const credits=user1[0].credits
    const user = await userlogin.findOneAndUpdate(
        { email },
        { $set: { credits: credits+20 } },
        { new: true } // This option returns the modified document
    );

    // Update the user's credits with the provided value


    console.log("Updated user:", user);
    return NextResponse.json({success:"success"})
}