import React from 'react'
import vdo from '../../assets/Video/homePageVdo.mp4';
export default function Home() {
  return (
    <div>
      <div className=" sm:flex h-fit">
          <div className="bg-teal-900 text-white sm:w-1/2 text-center sm:text-justify ">
           <p className='sm:my-36 text-center ml-10 text-5xl'> There is no such thing as <span className='font-bold'>away.</span> When you throw something away, it must go somewhere.</p>
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
