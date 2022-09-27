import React from 'react'

export default function PickUp() {
  return (
    <div>
        <form className='max-w-[400px] w-full mt-20 mx-auto rounded-xl bg-teal-900 text-white p-4'>
                <h2 className='text-4xl font-bold text-center py-6'>Schedule Your PickUp</h2>
                <div className='flex flex-col py-2'>
                    <label>Username</label>
                    <input className='border p-2' type="text" />
                </div>
                <div className='flex flex-col py-2'>
                    <label>Phone Number</label>
                    <input className='border p-2' type="number"/>
                </div>
                <div className='flex flex-col py-2'>
                    <label>Pin Code</label>
                    <input className='border p-2' type="number" />
                </div>
                <div className='flex flex-col py-2'>
                    <label>Garbage Type</label>
                    <select name="GarbageType" id="GarbageType" className="text-black" >
                        <option value="Yellow">Yellow (papers and glass bottles)</option>
                        <option value="Blue">Blue( plastic wrappers and non-bioderadable wastes)</option>
                        <option value="Green">Green(wet and bioderadable wastes)</option>
                    </select>
                </div>
                <div className='flex flex-col py-2'>
                    <label>Address</label>
                    <textarea className='border p-2' type="text" />
                </div>
                <div className='flex flex-col py-2'>
                    <label>PickUp Time</label>
                    <input className='border p-2' type="time" />
                </div>
                <button className='border w-full my-5 py-2 bg-white text-teal-900'>Schedule</button>
                
        </form>
    </div>
  )
}
