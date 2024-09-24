// /pages/api/credits.js
import { dbconnection } from '@/app/lib/database';
import { userlogin } from '@/app/lib/model';
import { NextResponse } from 'next/server';
import { applyRateLimit } from '@/app/lib/middleware/rateLimiter';
import { isEmail } from 'validator';
export async function GET(req) {
  try {

    console.log("Applying rate limit...");
    await applyRateLimit(req, new NextResponse());
    console.log("Rate limit applied.");

    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    if (!isEmail(email)) {
      return NextResponse.json({ msg: "Invalid email format" }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await dbconnection();

    const user = await userlogin.find({ email });

    if (!user || user.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const credits = user[0].credits;

    // Return the credits in the response
    return NextResponse.json({ credits });
  } catch (error) {
    console.log("Error:", error.message);
    return NextResponse.json({ error: 'Too many requests, please try again later.' }, { status: 429 });
  }
}
