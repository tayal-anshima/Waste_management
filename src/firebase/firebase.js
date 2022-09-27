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
  apiKey: "AIzaSyDCI4D2RV6A0Gr1sdZxGI0Mi_rqXpJhCw4",
  authDomain: "waste-setu.firebaseapp.com",
  projectId: "waste-setu",
  storageBucket: "waste-setu.appspot.com",
  messagingSenderId: "334939737045",
  appId: "1:334939737045:web:4e7756fd8c5e3e63aecb5c",
  measurementId: "G-4TKSMPN7GW"
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
      console.log(err);
    }
  }
  return userRef;
}

export const setPickups = async (pickup) => {
  try {
    const userRef = doc(firestore, `users/${pickup.user}`);
    const userSnap = (await getDoc(userRef)).data();
    const docRef = await addDoc(collection(firestore, "pickups"), {
      type: pickup.type,
      weight: pickup.weight,
      imageId: pickup.imageId,
      dayTime: pickup.dayTime,
      location: pickup.location,
      OTP: pickup.OTP,
      status: pickup.status,
      user: userRef,
      createdAt : new Date()
    });
    const pickups = userSnap.pickups;
    await updateDoc(userRef, { pickups: [...pickups, docRef] });
  } catch (err) {
    console.log(err);
  }
};

export const getPickupHistoryForCitizen = async (userId) => {
  const userRef = doc(firestore, `users/${userId}`);
  const userSnap = (await getDoc(userRef)).data();
  const pickups = userSnap.pickups;
  const pickupHistory = [];
  for (let i = 0; i < pickups.length; i++) {
    const pickup = (await getDoc(pickups[i])).data();
    pickupHistory.push(pickup);
  }
  return pickupHistory;
};

export const getPickupForGarbageCollector = async (userId) => {
  const userRef = doc(firestore, `users/${userId}`);
  const userSnap = (await getDoc(userRef)).data();
  const truckColour = userSnap.truckColour;
  const pickups = [];
  const pickupRef = collection(firestore, "pickups");
  const pickupSnap = await getDocs(pickupRef);
  pickupSnap.forEach((doc) => {
    const pickup = doc.data();
    if (pickup.status === "pending" && pickup.type === truckColour && pickup.createdAt.toDate() < new Date()-86400000) {
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
    console.log(err);
  }
};