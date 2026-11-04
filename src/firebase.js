import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCouiapQXG6jg-jRmQbVWi6yP-LWFLxK-U",
  authDomain: "world-developer.firebaseapp.com",
  projectId: "world-developer",
  storageBucket: "world-developer.appspot.com",
  messagingSenderId: "228692246087",
  appId: "1:228692246087:web:ce4936c8dbb4d97285bb62"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
