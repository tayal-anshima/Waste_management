import React from 'react'
import {Link} from 'react-router-dom'
const data = [
  {  user:"Anshima Tayal",category:"Citizen" }
  ]
export default function Profile() {
 return (
  <div>
  <div  className='max-w-[400px] w-full mx-auto mt-20 rounded-xl bg-teal-900 text-white p-4'>
           <h2 className='text-4xl font-bold text-center py-6'>Profile</h2>
           <div className='flex flex-col py-2'>
               <label>Username</label>
               {data.map((val, key) => {
                 return (
              <p className='border p-2 bg-white text-black' key={key} >{val.user}</p>
            )
            })}
              
           </div>
           <div className='flex flex-col py-2'>
               <label>Category</label>
               {data.map((val, key) => {
                 return (
               <p className='border p-2 bg-white text-black' key={key} >{val.category}</p>
            )
            })}
           </div>
           
           <Link to="/">
           <button className='border w-full my-5 py-2 bg-white  text-teal-900' >Log Out</button>
           </Link>
           
   </div>
</div>
  )
}

