"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn, signOut, useSession } from 'next-auth/react';
  import { useDispatch, useSelector } from "react-redux";
  import { increment,decrement } from "@/store/createslice";
import { useRouter } from 'next/navigation';
export default function Home() {
  const { data: session } = useSession();

  const dispatch = useDispatch();
  const useremail = useSelector((state) => state.counter.credits);
  const [prompt, setPrompt] = useState('');
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('English');
  const [style, setStyle] = useState('Story Starters');
  const [response, setResponse] = useState('');
  const [load, setload] = useState(false);
  const credits = useSelector((state) => state.counter.credits);
  const router=useRouter()
  const handleSubmit = async () => {

   setload(true)

   console.log(credits,topic.length)
    if(topic.length==0){
      toast.error('Enter Prompt', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        });
        setload(false)
        return 
    }
    
    if(credits<=0){
      setload(false)
      console.log(credits)
      toast.error('Credits out of Limit', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        });
    }
    else{
      
      
     

    
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}/api/claude`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: topic,style:style,language:language })  // Update to send the topic as prompt
      });
      const re = await result.json();
      console.log(re.msg.content[0].text);
      setResponse(re.msg.content[0].text);

      
       console.log("hello")
       const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALURL}/api/decreasecredits`, {
            method: 'POST', // Use POST method to send the body data
            headers: {
              'Content-Type': 'application/json', // Set the correct header
            },
            body: JSON.stringify({ email: session.user.email,credit:credits-2 }),
        });
        dispatch(decrement(2));
        console.log("hello")
        const upd=await response.json()
       console.log(upd)
      
      // toast.success(`Credits rem ${credits-2} `, {
      //   position: "top-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: false,
      //   pauseOnHover: true,
      //   draggable: false,
      //   progress: undefined,
      //   theme: "dark",
      //   });

    } catch (error) {
      console.log(error)
      console.error('Error fetching response:', error);
      setResponse('Server was Busy. Try after some time');
    }
  }
  setload(false)
  };

  return (
    <div className="font-sans m-8">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Generate Hook with HookUp</h1>
      <div className="mb-4">
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Enter your Topic</label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          maxLength="100"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md border bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
        <p className="mt-2 text-sm text-gray-500">Characters: {topic.length}/100</p>
      </div>
      <div className="mb-4">
        <label htmlFor="language" className="block text-sm font-medium text-gray-700 ">Select Language:</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-1 block border bg-white w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="English">English</option>
          <option value="Telugu">Telugu</option>
          <option value="Hindi">Hindi</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="style" className="block text-sm font-medium text-gray-700">Select Hook Style:</label>
        <select
          id="style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 border py-2 text-base bg-white border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
<option value="story-starters">Story Starters</option>
<option value="jaw-dropping-facts">Jaw-Dropping Facts</option>
<option value="curiosity-sparkers">Curiosity Sparkers</option>
<option value="quotable-moments">Quotable Moments</option>
<option value="mind-bending-contrasts">Mind-Bending Contrasts</option>
<option value="vivid-visualizations">Vivid Visualizations</option>
<option value="bold-declarations">Bold Declarations</option>
<option value="scene-setters">Scene Setters</option>
<option value="problem-solvers">Problem Solvers</option>
<option value="laugh-inducers">Laugh Inducers</option>
<option value="time-travelers">Time Travelers</option>
<option value="what-if-wonders">What-If Wonders</option>
<option value="myth-busters">Myth Busters</option>
<option value="emotional-triggers">Emotional Triggers</option>
<option value="sensory-awakeners">Sensory Awakeners</option>
<option value="cliffhangers">Cliffhangers</option>
<option value="call-to-adventure">Call to Adventure</option>
<option value="unexpected-connections">Unexpected Connections</option>
<option value="future-glimpses">Future Glimpses</option>
<option value="personal-challenges">Personal Challenges</option>
<option value="playful-provocations">Playful Provocations</option>
<option value="insider-secrets">Insider Secrets</option>
<option value="success-stories">Success Stories</option>
<option value="dilemmas-decisions">Dilemmas and Decisions</option>
<option value="expert-opinions">Expert Opinions</option>
<option value="common-mistakes">Common Mistakes</option>
<option value="interactive-questions">Interactive Questions</option>
<option value="surprising-statistics">Surprising Statistics</option>
<option value="behind-the-scenes-insights">Behind-the-Scenes Insights</option>
<option value="inspiring-quotes">Inspiring Quotes</option>
<option value="naughty-style">Naughty Style</option>

        </select>
      </div>
      
      <button
        onClick={handleSubmit}

      >
        {
          load?<div> <span className="loading loading-bars loading-md"></span>
 </div>:<h1         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Generate Hook</h1>
        }
        
      </button>
      <h2 className="mt-6 text-xl font-semibold">Generated Hook:</h2>
      <p className="mt-2 text-gray-700">{response}</p>
    </div>
  );
}
