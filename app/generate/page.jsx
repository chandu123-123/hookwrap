import React from 'react'
import Claude from '../components/Claude'
import Navbar from '../components/Navbar'
const Page = () => {
 
  return (
    <div>
        <Navbar></Navbar>
        {
         
          <Claude></Claude>

        }
      
    </div>
  )
}

export default Page