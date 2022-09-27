import React,{useState} from 'react'

export default function SignUp(props) {
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[pincode,setPincode]=useState("");
    const[truckcolour,setTruckcolour]=useState("");
    const handleSubmit=async(e)=>{
        //code
    }
  return (
        <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto rounded-xl bg-white p-4'>
                <h2 className='text-4xl font-bold text-center py-6'>Sign Up</h2>
                <div className='flex flex-col py-2'>
                    <label>Username</label>
                    <input className='border p-2' type="text" onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <input className='border p-2' type="password" onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className='flex flex-col py-2'>
                    <label>Pin Code</label>
                    <input className='border p-2' type="number" onChange={(e) => setPincode(e.target.value)} required/>
                </div>
                <div className='flex flex-col py-2'>
                    <label>Truck Colour</label>
                    <select id="truckColour" onChange={(e) => setTruckcolour(e.target.value)} required >
                       <option value="Yellow">Yellow(papers and glass bottles)</option>
                       <option value="Green">Green(wet and bioderadable wastes)</option>
                       <option value="Green">Blue(plastic wrappers and non-bioderadable wastes)</option>
                    </select>
                </div>
                <button className='border w-full my-5 py-2 bg-teal-900 hover:bg-teal-800 text-white'onClick={()=>{props.signed(true)}}>Sign In</button>
                
        </form>
  )
}
