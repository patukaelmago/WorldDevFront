import axios from 'axios';
import { auth } from './firebase';
import { isDemoActive, DEMO_MODE } from './demoSession';
export const API_URL = process.env.REACT_APP_API_URL || 'https://worlddevback-w379.onrender.com';
axios.interceptors.request.use(async config => {
  const target = new URL(config.url, window.location.origin);
  if (target.origin === new URL(API_URL).origin) {
    config.timeout = 90000;
    if (isDemoActive()) {
      delete config.headers.Authorization;
      config.headers['X-World-Developers-Demo'] = DEMO_MODE;
      if (!['get', 'head'].includes((config.method || 'get').toLowerCase())) {
        throw new axios.AxiosError('Demo de solo lectura: no se permiten cambios.', 'ERR_DEMO_READONLY', config);
      }
      return config;
    }
    if (auth.currentUser) config.headers.Authorization = `Bearer ${await auth.currentUser.getIdToken()}`;
  }
  return config;
});
