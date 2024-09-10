import { dbconnection } from '@/app/lib/database'; // Ensure this exports a function to connect to MongoDB
import { userlogin } from '@/app/lib/model'; 
import { NextResponse } from 'next/server';
export async function POST(req,res) {
    console.log("hello")
    const body=await req.json();
    await dbconnection();
    const {email}=body
    console.log(email)
    const user=await userlogin.find({email:email})
    console.log(user[0])
    const credits=user[0].credits
    console.log(credits)
    console.log(body)
    return NextResponse.json({credits:credits})
}