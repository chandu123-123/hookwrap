import { dbconnection } from '@/app/lib/database'; // Ensure this exports a function to connect to MongoDB
import { userlogin } from '@/app/lib/model'; 
import { NextResponse } from 'next/server';
export async function POST(req,res) {
    console.log("hello")
    const body=await req.json();
    await dbconnection();
    const {email,credit}=body
    console.log(body)
    const user = await userlogin.findOneAndUpdate(
        { email },
        { $set: { credits: credit } },
        { new: true } // This option returns the modified document
    );

    // Update the user's credits with the provided value


    console.log("Updated user:", user);
    return NextResponse.json({success:"success"})
}