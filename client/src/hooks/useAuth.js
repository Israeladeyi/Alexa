// src/hooks/useAuth.js
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  useEffect(() =>
    onAuthStateChanged(auth, u => setUser(u)),
  [auth]);
  
  const signup = (email, pw) =>
    createUserWithEmailAndPassword(auth, email, pw);
  const login  = (email, pw) =>
    signInWithEmailAndPassword(auth, email, pw);
  const logout = () => signOut(auth);

  return { user, signup, login, logout };
}
