import React from 'react'
import HomeNavbar from './HomeNavbar';

export default function Home() {
  return (
    <div>
       <HomeNavbar/>
       <div className="flex">
          <div className="bg-white w-1/2 h-screen">
             content 
          </div>
          <div className="bg-lime-900 w-1/2 h-screen clip-your-needful-style">
             image/svg 
          </div>
       </div>
    </div>
  )
}
