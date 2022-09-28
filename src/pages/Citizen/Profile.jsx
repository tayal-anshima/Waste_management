import React from 'react'
import {Link} from 'react-router-dom'
import { useUserAuth } from "../../context/UserAuthContext";

export default function Profile() {
  const { user, logOut } = useUserAuth();
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      //console.log(error);
    }
  };
 return (
  <div>
  <div  className='max-w-[400px] w-full mx-auto mt-20 rounded-xl bg-teal-900 text-white p-4'>
           <h2 className='text-4xl font-bold text-center py-6'>Profile</h2>
           <div className='flex flex-col py-2'>
                <label>Name</label>
                <p className='border p-2 bg-white text-black' >{user ? user.displayName : ""}</p>
           </div>
           <div className='flex flex-col py-2'>
               <label>Category</label>
               {
                user && user.isCitizen ? <p className='border p-2 bg-white text-black' >Citizen</p> : <p className='border p-2 bg-white text-black' >Garbage Collector</p>
               }
           </div>
           
           <Link to="/">
           <button onClick={handleLogOut} className='border w-full my-5 py-2 bg-white  text-teal-900' >Log Out</button>
           </Link>
           
   </div>
</div>
  )
}

