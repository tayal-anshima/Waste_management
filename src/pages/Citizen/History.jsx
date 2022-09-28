import React from 'react'
import PendingIcon from '@mui/icons-material/Pending';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import CancelIcon from '@mui/icons-material/Cancel';

const data = [
  {  date: "28-09-2022" ,weight:"30kg",type:"Green",pickupStatus:"Completed",otp:" 24561" },
  {  date: "28-09-2022" ,weight:"30kg",type:"Green",pickupStatus:"Pending", otp:"24561 "},
  { date: "28-09-2022" ,weight:"30kg",type:"Green",pickupStatus:"Cancel" , otp:" 24561"},
]
export default function History() {
  return (
    <div className="m-10">
       <table className="border-2 border-teal-900 w-full h-fit">
        <tr>
         
          <th className="border-b-2 border-black">Date</th>
          <th className="border-b-2 border-black">Weight</th>
          <th className="border-b-2 border-black">Garbage type</th>
          <th className="border-b-2 border-black">Pickup Status</th>
          <th className="border-b-2 border-black">OTP</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
           
              <td className='text-center'>{val.date}</td>
              <td className='text-center'>{val.weight}</td>
              <td className='text-center'>{val.type}</td>
              <td className='text-center'><CancelIcon className="text-red-600" style={{'visibility':val.pickupStatus==='Cancel'?'visible':'hidden'}}/><PendingIcon className="text-amber-600" style={{'visibility':val.pickupStatus==='Pending'?'visible':'hidden'}}/><LibraryAddCheckIcon className="text-teal-600" style={{'visibility':val.pickupStatus==='Completed'?'visible':'hidden'}}/></td>
              <td className='text-center' style={{'visibility':val.pickupStatus==='Pending'?'visible':'hidden'}}>{val.otp}</td>
           </tr>
          )
        })}
         </table>
    </div>
  )
}
