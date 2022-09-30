import React, { useState, useEffect } from 'react'
import PendingIcon from '@mui/icons-material/Pending';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import CancelIcon from '@mui/icons-material/Cancel';
import { useUserAuth } from "../../context/UserAuthContext";
// import { getPickupHistoryForCitizen } from "../../firebase/firebase";
import { firestore } from '../../firebase/firebase';
import {
  doc,
  getDoc,
} from "firebase/firestore";

export default function History() {
  const { user } = useUserAuth();
  //console.log(user);
  let [pickups, setPickups] = useState([]);
  // const getData = async () => {
  //   if (user && user.pickups) {
  //     // const pickupArray = await getPickupHistoryForCitizen(user.uid);
  //     // setPickups(pickupArray);
  //   }
  // };
  // getData();


  useEffect(() => {
    const getUserPickups = async() => {
      console.log('Worked')
      const userRef = doc(firestore, `users/${user.uid}`);
      const userSnap = (await getDoc(userRef)).data();
      const pickups = userSnap.pickups;
      console.log( userSnap.pickups);
      const pickupHistory = [];
      for (let i = 0; i < pickups.length; i++) {
        const pickup = (await getDoc(pickups[i])).data();
        pickupHistory.push(pickup);
      }
      setPickups(pickupHistory);
    }
    if(user) {
      console.log("user")
    }
    getUserPickups();
    
  }, [user]);

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
          console.log(val.dayTime,
            val.weight,
            val.status,
            val.type,
            val.OTP)
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
