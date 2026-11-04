import axios from 'axios';
import { auth } from './firebase';
export const API_URL = process.env.REACT_APP_API_URL || 'https://worlddevback-w379.onrender.com';
axios.interceptors.request.use(async config => {
  const target = new URL(config.url, window.location.origin);
  if (target.origin === new URL(API_URL).origin) {
    config.timeout = 90000;
    if (auth.currentUser) config.headers.Authorization = `Bearer ${await auth.currentUser.getIdToken()}`;
  }
  return config;
});
