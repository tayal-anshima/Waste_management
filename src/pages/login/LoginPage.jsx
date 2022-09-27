import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

export default function LoginPage(props) {
  const[username,setUsername]=useState("");
  const[password,setPassword]=useState("");
  const[category,setCategory]=useState("Citizen");

  function handleChange (e) {
    setCategory(e.target.value);
  }

  function printValue(e) {
    console.log(e);
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    //code
    
  }
  return (
    <div>
       <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto mt-20 rounded-xl bg-teal-900 text-white p-4'>
                <h2 className='text-4xl font-bold text-center py-6'>Login</h2>
                <div className='flex flex-col py-2'>
                    <label>Username</label>
                    <input className='border p-2' type="text"  onChange={(e) => setUsername(e.target.value)}required/>
                </div>
                <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <input className='border p-2' type="password"  onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className='flex flex-col py-2'>
                    <label>Category</label>
                     <select className="text-black" required onChange={ handleChange }>
                       <option value="Citizen" >Citizen</option>
                       <option value="Garbage Collector" >Garbage Collector</option>
                     </select>
                </div>
                
                <Link to={`${category==="Citizen"?"/citizens":"/collector"}`}>
                <button className='border w-full my-5 py-2 bg-white  text-teal-900' >Login</button>
                </Link>
                
        </form>
    </div>
  )
}

