import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "../AuthContext/AuthContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import { auth } from "@/firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const registerWithEmail = useCallback(async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }, []);

  const signInwithEmail = useCallback(async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }, []);

  const signOutUser = useCallback(async () => {
    try {
      return await signOut(auth);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }, []);

  const updateUserProfile = useCallback(async (profile) => {
    try {
      return await updateProfile(auth.currentUser, profile);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }, []);

  //   observer

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const userInfo = useMemo(
    () => ({
      registerWithEmail,
      signInwithEmail,
      signInWithGoogle,
      signOutUser,
      updateUserProfile,
      user,
      authLoading,
    }),
    [
      user,
      authLoading,
      registerWithEmail,
      signInwithEmail,
      signInWithGoogle,
      updateUserProfile,
      signOutUser,
    ],
  );

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
