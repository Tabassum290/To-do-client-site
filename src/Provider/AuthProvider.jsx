import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import { auth } from "../Firebase/firebase";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };
  const SignInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const user = { email: currentUser?.email };
        axios
          .post(
            "https://assignment-11-server-side-ebon.vercel.app/query/jwt",
            user,
            { withCredentials: true }
          )
          .then((res) => {
            console.log("login data", res.data);
            setLoading(false);
          });
      } else {
        axios
          .post(
            "https://assignment-11-server-side-ebon.vercel.app/logout",
            {},
            { withCredentials: true }
          )
          .then((res) => console.log("logout", res.data));
        setLoading(false);
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

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
    createNewUser,
    SignInUser,
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
