import { dbconnection } from '@/app/lib/database'; // Ensure this exports a function to connect to MongoDB
import { userlogin } from '@/app/lib/model'; 
import { NextResponse } from 'next/server';
export async function POST(req,res) {
    console.log("hello")
    const body=await req.json();
    await dbconnection();
    const {email}=body
    const usercred = await userlogin.findOne({ email });
    if(!usercred)
    {
        return NextResponse.json({msg:"Not authorized"})
    }
    console.log(usercred.credits)
    let cred=usercred.credits-2;
    console.log(body)
    const user = await userlogin.findOneAndUpdate(
        { email },
        { $set: { credits: cred } },
        { new: true } // This option returns the modified document
    );

    // Update the user's credits with the provided value


    console.log("Updated user:", user);
    return NextResponse.json({success:"success"})
}