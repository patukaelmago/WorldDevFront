import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import axios from 'axios';
import { auth } from '../firebase';
import { API_URL } from '../api';
const authContext = createContext();
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error('There is no Auth provider');
  return context;
};
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const syncProfile = async current => {
    const { data } = await axios.post(`${API_URL}/users`, { id: current.uid });
    setProfile(data);
    return data;
  };
  const signup = async (email, password, rol, displayName, photoURL) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await axios.post(`${API_URL}/users`, { id: result.user.uid, displayName: displayName || '', photoURL: photoURL || '' });
    return result;
  };
  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await syncProfile(result.user);
    return result;
  };
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    await syncProfile(result.user);
    return result;
  };
  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthStateChanged(auth, async current => {
      setLoading(true);
      setUser(current);
      if (!current) { setProfile(null); setLoading(false); return; }
      try { await syncProfile(current); }
      catch (error) { if (active) setProfile(null); }
      finally { if (active) setLoading(false); }
    });
    return () => { active = false; unsubscribe(); };
  }, []);
  return <authContext.Provider value={{ signup, login, user, profile, loading, loginWithGoogle, logout: () => signOut(auth), resetPassword: email => sendPasswordResetEmail(auth, email) }}>{children}</authContext.Provider>;
}
