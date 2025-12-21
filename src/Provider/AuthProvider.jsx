import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import app from "../Firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //update
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  //sending password reset mail
  const userPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  //google

  const signInGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //observer user state
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubcribe();
    };
  }, []);

  //logout

  const logOut = () => {
    return signOut(auth);
  };

  const authData = {
    user,
    loading,
    registerUser,
    signInUser,
    signInGoogle,
    logOut,
    updateUserProfile,
    userPasswordReset,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
