import { createContext, useEffect, useState, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
import { auth, createUserObject } from "../firebase/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  async function signUp(email, password, data) {
    try{
      const { user } = await createUserWithEmailAndPassword( auth, email, password);
      await createUserObject(user, data);  
    }
    catch(err){
      //console.log(err);
    }
  }

  function logIn(email, password) {
    try{
      return signInWithEmailAndPassword(auth, email, password);
    }
    catch(err){
      //console.log(err);
    }
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = await createUserObject(currentUser);
        onSnapshot(userRef, (snapshot) => {
          setUser({ id: snapshot.id, ...snapshot.data() });
          setLoadingUser(false);
          if (user) navigate(location.pathname, { replace: true });
        });
      } else {
        setLoadingUser(false);
        setUser(null);
      }
    });
    return unsubscribe;
    // eslint-disable-next-line
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        loadingUser,
        user,
        signUp,
        logIn,
        logOut,
        setLoadingUser,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
