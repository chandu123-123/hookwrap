import { dbconnection } from '@/app/lib/database'; 
import { userlogin } from '@/app/lib/model'; 
import { NextResponse } from 'next/server';
import { applyRateLimit } from '@/app/lib/middleware/rateLimiter';
import { isEmail } from 'validator';
export async function POST(req,res) {


    console.log("hello")
    const body=await req.json();
    await dbconnection();
    const {email}=body
    if (!isEmail(email)) {
        return NextResponse.json({ msg: "Invalid email format" }, { status: 400 });
      }
    const usercred = await userlogin.findOne({ email });
    if(!usercred)
    {     
        return NextResponse.json({msg:"Not authorized"},{ status: 400 })
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