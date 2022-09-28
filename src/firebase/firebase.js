import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import {
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  collection,
  updateDoc,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9OsSMKNh2qsoPzat-bekTrREX-nFAZk0",
  authDomain: "wastesetu2.firebaseapp.com",
  projectId: "wastesetu2",
  storageBucket: "wastesetu2.appspot.com",
  messagingSenderId: "876736884007",
  appId: "1:876736884007:web:633d3dca9e545c628d8d02",
  measurementId: "G-7Y4GNHGLPQ"
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore();
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;

export async function createUserObject(userAuth, data) {
  if (!userAuth) return;
  const uid = userAuth.uid;
  const userRef = doc(firestore, `users/${uid}`);
  const userSnapshot = await getDoc(userRef);
  if (!userSnapshot.exists()) {
    const { email, displayName } = userAuth;
    const createdAt = new Date(), pickups = [];
    try {
      setDoc(userRef, { displayName, uid, email, pickups, createdAt, ...data });
    } catch (err) {
      //console.log(err);
    }
  }
  return userRef;
}

export const setPickups = async (pickup) => {
  try {
    const userRef = doc(firestore, `users/${pickup.user}`);
    const userSnap = (await getDoc(userRef)).data();
    // //console.log(pickup);
    const docRef = await addDoc(collection(firestore, "pickups"), {
      type: pickup.type,
      weight: pickup.weight,
      // imgUrl: pickup.imgUrl,
      dayTime: pickup.dayTime,
      location: pickup.location,
      pincode: pickup.pincode,
      OTP: pickup.OTP,
      status: pickup.status,
      user: userRef,
      createdAt : new Date()
    });
    const pickups = userSnap.pickups;
    await updateDoc(userRef, { pickups: [...pickups, docRef] });
  } catch (err) {
    //console.log(err);
  }
};

// export const getPickupHistoryForCitizen = async (userId) => {
//   const userRef = doc(firestore, `users/${userId}`);
//   const userSnap = (await getDoc(userRef)).data();
//   //console.log(userSnap);
//   const pickups = userSnap.pickups;
//   const pickupHistory = [];
//   for (let i = 0; i < pickups.length; i++) {
//     const pickup = (await getDoc(pickups[i])).data();
//     pickupHistory.push(pickup);
//   }
//   return pickupHistory;
// };



export const getPickupForGarbageCollector = async (userId) => {
  const userRef = doc(firestore, `users/${userId}`);
  const userSnap = (await getDoc(userRef)).data();
  const truckColour = userSnap.truckColour;
  const pickups = [];
  const pickupRef = collection(firestore, "pickups");
  const pickupSnap = await getDocs(pickupRef);
  pickupSnap.forEach((doc) => {
    const pickup = doc.data();
    // if (pickup.status === "pending" && pickup.type === truckColour && pickup.createdAt.toDate() < new Date()-86400000) {
    if (pickup.status === "pending" && pickup.type === truckColour) {
      pickups.push(pickup);
    }
  });
  pickups.sort((a, b) => {
      return a.dayTime - b.dayTime;
  });
  return pickups;
};

export const updatePickupStatus = async (pickupId, status) => {
  try {
    const pickupRef = doc(firestore, `pickups/${pickupId}`);
    await updateDoc(pickupRef, { status });
  }
  catch (err) {
    //console.log(err);
  }
};