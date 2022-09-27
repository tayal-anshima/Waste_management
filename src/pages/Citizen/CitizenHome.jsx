import React,{useState} from 'react'
import img from '../../assets/images/home.jpg';
import SignUp from './SignUp';
import CitizenLanding from './CitizenLanding';

export default function CitizenHome() {
  const[signed,setSigned]=useState(true);
  return (
    <div className='h-screen'>
       <div className=" sm:flex bg-teal-900 h-fit">
          <div className=" sm:w-1/2 sm:my-10 text-center sm:text-justify ">
            {signed?(<CitizenLanding/>):(<SignUp signed={setSigned}/>)};
          </div>
          <div className=" sm:w-1/2 grid  justify-items-center sm:justify-items-end ">
             <img className="h-full hidden sm:block " src={img} alt=""/>
          </div>
       </div>
    </div>
  )
}
