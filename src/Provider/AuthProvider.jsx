import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
console.log(user);
  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };
  useEffect (()=>{
    const unSubscribe =  onAuthStateChanged(auth,(currentUser )=> {
        setUser(currentUser);
        setLoading(false);
      })
      return ()=>{
        unSubscribe();
      }
    },[])

  const signinWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    user,
    setUser,
    signOutUser,
    signinWithGoogle,
    updateUserProfile,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
