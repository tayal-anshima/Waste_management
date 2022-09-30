import React,{useState} from 'react'
import vdo from '../../assets/Video/ComponentsVdo.mp4';
import SignUp from './SignUp';
import CitizenLanding from './CitizenLanding';
import { useUserAuth } from "../../context/UserAuthContext";

export default function CitizenHome() {
  const { user } = useUserAuth();
  const [signed,setSigned]=useState(false);
  //console.log(signed)
  return (
   <div>
   <div className=" sm:flex h-fit">
       <div className="bg-teal-900 sm:w-1/2 text-center sm:text-justify p-10">
         {user?(<CitizenLanding/>):(<SignUp signed={setSigned}/>)};
       </div>
       <div className="bg-teal-900 sm:w-1/2 grid justify-items-center sm:justify-items-end ... ">
          <video autoPlay loop muted className='mt-12 sm:mt-20 h-4/6 rounded-xl sm:rounded-l-full ...'>
             <source src={vdo} type="video/mp4"></source>
         </video>
       </div>
    </div>
 </div>
  )
}

