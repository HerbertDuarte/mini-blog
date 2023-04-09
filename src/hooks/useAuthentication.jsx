import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // cleanUp
  // deal with memory leak
  // limpar a memoria e não re-executar func

  const [cancelled, setCancelled] = useState(false);

  const checkCancellation = () => {
    if (cancelled) {
      return;
    }
  };

  const auth = getAuth();

  async function createUser(data) {
    checkCancellation();

    setLoading(true);
    setError(false);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, { displayName: data.name });
      console.log(data);
      setError(false);
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("password")) {
        systemErrorMessage =
          "Invalid Password, the password must be 6 characters or more.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "This email already in use.";
      } else {
        systemErrorMessage = "Authentication Error, try again other time.";
      }

      setError(systemErrorMessage);
    }

    setLoading(false);
  }

  const login = async (data) =>{
    setError(false)
    setLoading(true)

    try {
      
      await signInWithEmailAndPassword(auth, data.email, data.password)

    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage =
          "User not found!";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Wrong password! Try again.";
      } else {
        systemErrorMessage = "Authentication Error, try again other time.";
      }

      setError(systemErrorMessage);
    }

    setLoading(false)
  }

  const logout = () => {
    checkCancellation();
    console.log("logout");
    signOut(auth);
  };

  useEffect(() => setCancelled(true), []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login
  };
};
