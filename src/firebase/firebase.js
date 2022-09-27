import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  writeBatch,
  collection,
  Timestamp,
  updateDoc,
  addDoc,
} from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDeITRWCGXAGS5OReGsUFEL2ogPAYzTtcE",
//   authDomain: "v-proctify.firebaseapp.com",
//   databaseURL: "https://v-proctify-default-rtdb.firebaseio.com",
//   projectId: "v-proctify",
//   storageBucket: "v-proctify.appspot.com",
//   messagingSenderId: "91495921707",
//   appId: "1:91495921707:web:a1d76423a74e1a9831926e"
// };

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
    const createdAt = new Date();
    try {
      setDoc(userRef, { displayName, uid, email, createdAt, ...data });
    } catch (err) {
      console.log(err);
    }
  }
  return userRef;
}

export const setGoalstoDB = async (goals) => {
  try {
    const userRef = doc(firestore, `users/${goals.user}`);
    const userSnap = (await getDoc(userRef)).data();
    const docRef = await addDoc(collection(firestore, "prescriptions"), {
      exercise: doc(firestore, `excercises/${goals.exercise}`),
      type: goals.type,
      days: goals.days,
      sets: goals.sets,
      reps: goals.reps,
      completed: goals.completed,
      user: userRef,
      routine: Array(parseInt(goals.days)).fill({
        completed: false,
        sets: 0,
        reps: 0,
        dailyRange: 0,
      }),
      created: Timestamp.now(),
    });
    const routine = userSnap.routine;
    await updateDoc(userRef, { routine: [...routine, docRef] });
  } catch (err) {
    alert(err);
  }
};

export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(firestore, collectionKey);
  const batch = writeBatch(firestore);
  Object.keys(objectsToAdd).forEach((key) => {
    const docRef = doc(collectionRef, key);
    batch.set(docRef, { ...objectsToAdd[key], id: docRef.id });
  });
  await batch.commit();
};

export const updateRoutineDB = async (excerciseVars) => {
  const { requiredReps, requiredSets, routine_id, dayRange } = excerciseVars;
  const routine_item_ref = doc(firestore, `prescriptions/${routine_id}`);
  const routine_item = (await getDoc(routine_item_ref)).data();
  const dayNo = Math.floor(
    (new Date() - routine_item.created.toDate()) / 86400000
  );
  const dayValues = {
    completed: true,
    reps: requiredReps,
    sets: requiredSets,
    dailyRange: dayRange || 135.0,
  };
  const updatedRoutineArray = routine_item.routine.map((item, idx) =>
    idx === dayNo ? dayValues : item
  );
  const updated_routine_item = {
    ...routine_item,
    routine: updatedRoutineArray,
    completed: dayNo === updatedRoutineArray.length ? true : false,
  };
  await updateDoc(routine_item_ref, updated_routine_item);
};

export const allocateDoctor = async (doctorId, userId) => {
  try {
    let docRef = doc(firestore, `users/${doctorId}`);
    let userRef = doc(firestore, `users/${userId}`);
    let user = (await getDoc(userRef)).data();
    let doctor = (await getDoc(docRef)).data();
    const doctor_patients = doctor.patients || [];
    const updated_doctor = {
      ...doctor,
      patients: [...doctor_patients, userRef],
    };
    await updateDoc(docRef, updated_doctor);
    const updated_user = {
      ...user,
      doctorAllocatted: true,
      doctorId: docRef,
    };
    await updateDoc(userRef, updated_user);
  } catch (err) {
    console.log(err);
  }
};
