'use client';
import React from 'react'
import Link from 'next/link'
import CreditsDisplay from './Credits'
import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';
const Navbar = () => {
   const { data: session } = useSession();
   return (
        <div className='flex justify-between mt-5'>
           <div>
              Hookup
           </div>
           <div className=''>
            <ul className='flex  gap-4'>
                <Link href="#pricing">Pricing</Link>
                <Link href="#faq"pr>FAQ</Link>
               {session?.user?.email ? <button onClick={() => signOut({ callbackUrl: '/' })}>Logout</button>: <button onClick={() => signIn('google',{ callbackUrl: '/' })}>Login</button>}
               <li>
                  <CreditsDisplay></CreditsDisplay>
               </li>
            </ul>

           </div>
        </div>
      )
}

export default Navbar
