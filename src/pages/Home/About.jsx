import React from 'react'
import logo from '../../assets/images/logo.png'
export default function About() {
  return (
    <div className=" h-fit">
       <p className="text-center font-bold text-5xl my-10 ">About Us</p>
       <div className="sm:flex items-center justify-between">
       <p className="text-center sm:w-1/2 m-10 text-lg">In todays senario with increasing population waste production and disposal has also raised which leads to diseases.Thus WASTE-SETU becomes the need of an hour .Waste-Setu is small cooperation to “smart cities” movement to become more efficient in managing solid waste. It connects local citizens with the garbage collector so that the citizens do not dump there waste in open but handover it to Garbage Collector.A citizen schedule their pickup request and garbage collector collects the garbage from their location on the scheduled time of the citizen </p>
       <img className='w-1/4 justify-items-end mx-auto sm:mr-32' src={logo} alt=""/>
       </div>
    </div>
  )
}
