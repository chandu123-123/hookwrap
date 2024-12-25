// pages/api/claude.js
import axios from "axios";
import { Anthropic } from '@anthropic-ai/sdk';
import { NextResponse } from "next/server";
import { dbconnection } from "@/app/lib/database";
import { applyRateLimit } from '@/app/lib/middleware/rateLimiter';
import { userlogin } from "@/app/lib/model";
import { isEmail } from 'validator';
export async function POST(req, res) {
  await dbconnection()

  


  console.log("hello")
    const data=await req.json();
    console.log(data)
    const { prompt,style,language,email } = data;
    if (!isEmail(email)) {
      return NextResponse.json({ msg: "Invalid email format" }, { status: 400 });
    }
    const usercred = await userlogin.findOne({ email });
    if(!usercred)
    { console.log("hell")
      return NextResponse.json({ msg: "Not authorized" }, { status: 403 });
    }
    if(usercred.credits<2){
      console.log("hell")
      return NextResponse.json({ msg: "Please purchase Credits" }, { status: 400 });
    }
    
    let lang=""
    console.log(language)
    if(language=="english"){
      lang="English"
    }
    else{
     lang=(`${language}  and basic English`)
    }
    console.log(lang)
    const anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API,
    });

  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 500,
      messages: [{ role: "user", content: `Dont repeat my question ,Just Generate only 2 short hooks for the topic: ${prompt}. Write them in mix of ${lang} for better fluency. These hooks should be distinctly different, engaging, and designed to grab audience attention. The hook style should be of ${style}`}]
    });
    console.log(msg);
    return NextResponse.json({msg});
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({error},{ status: 400 });
  }

}
