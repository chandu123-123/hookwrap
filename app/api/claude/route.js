// pages/api/claude.js
import axios from "axios";
import { Anthropic } from '@anthropic-ai/sdk';
import { NextResponse } from "next/server";
export async function POST(req, res) {
  console.log("hello")
    const data=await req.json();
    console.log(data)
    const { prompt,style,language } = data;
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
      apiKey: process.env.NEXT_PUBLIC_CLAUDE,
    });
  // console.log(process.env.NEXT_PUBLIC_CLAUDE)
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
    return NextResponse.json({});
  }



   
  

}
