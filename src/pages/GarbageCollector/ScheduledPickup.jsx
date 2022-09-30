import React from 'react'
import PendingIcon from '@mui/icons-material/Pending';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import CancelIcon from '@mui/icons-material/Cancel';
import { useUserAuth } from "../../context/UserAuthContext";
import { getPickupForGarbageCollector } from "../../firebase/firebase";

const data = [
  { user: "Mr Aakash Garg", location: "Rohini", time: "12:00" ,weight:"30kg",type:"Green",pickupStatus:"pending" },
  { user: "Anshima", location: "Rohini", time: "1:00" ,weight:"10kg",type:"Green",pickupStatus:"pending" },
  {user: "Vansh", location: "Paschim Vihar", time: "6:00" ,weight:"3kg",type:"Green",pickupStatus:"cancel"},
]
export default function History() {
  const { user } = useUserAuth();
  let [pickups, setPickups] = React.useState([]);
  const getData = async () => {
    if (user && user.pickups) {
      // const pickupArray = await getPickupForGarbageCollector(user.uid);
      // setPickups(pickupArray);
    }
  };
  //console.log(pickups);
  getData();
  return (
    <div className="m-10">
       <table className="border-2 border-teal-900 w-full h-fit">
        <tr>
          <th className="border-b-2 border-black">Name</th>
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
              <td className='text-center'><CancelIcon className="text-red-600" style={{'display':val.pickupStatus==='cancel'?'inline':'none'}}/><PendingIcon className="text-amber-600" style={{'display':val.pickupStatus==='pending'?'inline':'none'}}/><LibraryAddCheckIcon className="text-teal-600" style={{'display':val.pickupStatus==='completed'?'inline':'none'}}/></td>
           </tr>
          )
        })}
         </table>
    </div>
  )
}

