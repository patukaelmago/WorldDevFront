import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import axios from 'axios';
import { auth } from '../firebase';
import { API_URL } from '../api';
import { DEMO_EMAIL, DEMO_PASSWORD, demoUser, demoProfile, isDemoActive, setDemoActive } from '../demoSession';
const authContext = createContext();
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error('There is no Auth provider');
  return context;
};
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => isDemoActive() ? demoUser : null);
  const [profile, setProfile] = useState(() => isDemoActive() ? demoProfile : null);
  const [loading, setLoading] = useState(() => !isDemoActive());
  const loginDemo = async () => {
    await signOut(auth);
    setDemoActive(true);
    // A fresh page clears any previously loaded private Redux data.
    window.location.assign('/profileSuperAdmin');
  };
  const syncProfile = async current => {
    const { data } = await axios.post(`${API_URL}/users`, { id: current.uid });
    setProfile(data);
    return data;
  };
  const signup = async (email, password, rol, displayName, photoURL) => {
    setDemoActive(false);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await axios.post(`${API_URL}/users`, { id: result.user.uid, displayName: displayName || '', photoURL: photoURL || '' });
    return result;
  };
  const login = async (email, password) => {
    if (email.trim().toLowerCase() === DEMO_EMAIL) {
      if (password !== DEMO_PASSWORD) throw Object.assign(new Error('Wrong demo password'), { code: 'auth/wrong-password' });
      await loginDemo();
      return;
    }
    setDemoActive(false);
    const result = await signInWithEmailAndPassword(auth, email, password);
    await syncProfile(result.user);
    return result;
  };
  const loginWithGoogle = async () => {
    setDemoActive(false);
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    await syncProfile(result.user);
    return result;
  };
  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthStateChanged(auth, async current => {
      if (isDemoActive()) { setUser(demoUser); setProfile(demoProfile); setLoading(false); return; }
      setLoading(true);
      setUser(current);
      if (!current) { setProfile(null); setLoading(false); return; }
      try { await syncProfile(current); }
      catch (error) { if (active) setProfile(null); }
      finally { if (active) setLoading(false); }
    });
    return () => { active = false; unsubscribe(); };
  }, []);
  const logout = async () => {
    setDemoActive(false);
    await signOut(auth);
    setUser(null); setProfile(null);
  };
  return <authContext.Provider value={{ signup, login, loginDemo, user, profile, loading, isDemo: isDemoActive(), loginWithGoogle, logout, resetPassword: email => sendPasswordResetEmail(auth, email) }}>{children}</authContext.Provider>;
}
