import React from 'react'
import PendingIcon from '@mui/icons-material/Pending';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import CancelIcon from '@mui/icons-material/Cancel';

const data = [
  { user: "Anom", location: "Rohini", time: "12:00" ,weight:"30kg",type:"Green",pickupStatus:"Pending" },
  { user: "Anom", location: "Rohini", time: "12:00" ,weight:"30kg",type:"Green",pickupStatus:"Pending" },
  {user: "Anom", location: "Rohini", time: "12:00" ,weight:"30kg",type:"Green",pickupStatus:"Cancel"},
]
export default function History() {
  return (
    <div className="m-10">
       <table className="border-2 border-teal-900 w-full h-fit">
        <tr>
          <th className="border-b-2 border-black">Username</th>
          <th className="border-b-2 border-black">Location</th>
          <th className="border-b-2 border-black">Time</th>
          <th className="border-b-2 border-black">Weight</th>
          <th className="border-b-2 border-black">Garbage type</th>
          <th className="border-b-2 border-black">Pickup Status</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td className='text-center'>{val.user}</td>
              <td className='text-center'>{val.location}</td>
              <td className='text-center'>{val.time}</td>
              <td className='text-center'>{val.weight}</td>
              <td className='text-center'>{val.type}</td>
              <td className='text-center'><CancelIcon className="text-red-600" style={{'visibility':val.pickupStatus==='Cancel'?'visible':'hidden'}}/><PendingIcon className="text-amber-600" style={{'visibility':val.pickupStatus==='Pending'?'visible':'hidden'}}/><LibraryAddCheckIcon className="text-teal-600" style={{'visibility':val.pickupStatus==='Completed'?'visible':'hidden'}}/></td>
           </tr>
          )
        })}
         </table>
    </div>
  )
}

