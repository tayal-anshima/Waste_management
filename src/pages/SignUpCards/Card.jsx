import React from 'react'
import {Link} from 'react-router-dom'
export default function Card(props) {
  return (
    <div className="bg-teal-900 w-60  text-white p-5 ml-auto mr-auto md:m-auto shadow-lg rounded transform transition duration-300 hover:scale-110 cursor-pointer hover:shadow-2xl m-20">
       <img className="h-24 bg-white p-4 rounded-lg m-auto" src={props.img} alt=""/>
       <h2 className="font-bold text-xl text-center">{props.title}</h2>
       <p className='text-center my-6 h-20'>{props.content}</p>
       <Link className="border-4 p-2 hover:bg-white hover:text-teal-900 flex justify-center" to={props.linkTo} >Sign Up</Link>
    </div>
  )
}
