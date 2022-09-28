import React from 'react'
import PendingIcon from '@mui/icons-material/Pending';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import CancelIcon from '@mui/icons-material/Cancel';
import { useUserAuth } from "../../context/UserAuthContext";
import { getPickupHistoryForCitizen } from "../../firebase/firebase";

export default function History() {
  const { user } = useUserAuth();
  let [pickups, setPickups] = React.useState([]);
  const getData = async () => {
    if (user && user.pickups) {
      // const pickupArray = await getPickupHistoryForCitizen(user.uid);
      // setPickups(pickupArray);
    }
  };
  getData();
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
        {pickups.map((val, key) => {
          return (
            <tr key={key}>
              <td className='text-center'>{(new Date(val.dayTime*1000)).toString()}</td>
              <td className='text-center'>{val.weight}</td>
              <td className='text-center'>{val.type}</td>
              <td className='text-center'><CancelIcon className="text-red-600" style={{ 'display': val.status === 'cancel' ? 'inline' : 'none' }} /><PendingIcon className="text-amber-600" style={{ 'display': val.status === 'pending' ? 'inline' : 'none' }} /><LibraryAddCheckIcon className="text-teal-600" style={{ 'display': val.status === 'completed' ? 'inline' : 'none' }} /></td>
              <td className='text-center' style={{ 'visibility': val.status === 'pending' ? 'visible' : 'hidden' }}>{val.OTP}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}
