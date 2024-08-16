import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='py-8 flex justify-center text-center center  mt-40'>
      <ul className='flex gap-5 flex-col justify-center md:flex-row '>
      
        <li>
          <Link href="/termsandconditions">
            
            Terms & Conditions
          </Link>
        </li>
        <li>
        <Link href="/privacy">
            
            Privacy Policy
            </Link>
        </li>
        <li>
        <Link href="/refund">
            
          Refund Policy
            </Link>
        </li>
        <li>
        <Link href="/contact-us">
            
            Contact Us
            </Link>
        </li>
        <li>
        <Link href="/about-us">
            
            About Us
            </Link>
        </li>
        <p><strong>&copy; Company</strong> refers to hookwrap.in</p>

      </ul>
    </div>
  )
}

export default Footer
