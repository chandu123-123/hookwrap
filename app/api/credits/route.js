import { dbconnection } from '@/app/lib/database'; // Ensure this exports a function to connect to MongoDB
import { userlogin } from '@/app/lib/model'; 
import { NextResponse } from 'next/server';

export async function GET(req) {
    console.log("hello");
    
    // Extract email from the query parameters
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Connect to the database
    await dbconnection();
    
    console.log(email);
    
    // Find the user by email
    const user = await userlogin.find({ email: email });
    
    if (!user || user.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const credits = user[0].credits;
    console.log(credits);
    
    // Return the credits in the response
    return NextResponse.json({ credits: credits });
}
