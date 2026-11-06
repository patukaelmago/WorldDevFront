// Public preview credentials, not credentials for a Firebase/administrator account.
export const DEMO_EMAIL = 'demo@worlddevelopers.example';
export const DEMO_PASSWORD = 'WorldDevDemo2026!';
export const DEMO_MODE = 'readonly-v1';
const SESSION_KEY = 'worlddev-readonly-demo';
export const isDemoActive = () => sessionStorage.getItem(SESSION_KEY) === DEMO_MODE;
export const setDemoActive = active => active ? sessionStorage.setItem(SESSION_KEY, DEMO_MODE) : sessionStorage.removeItem(SESSION_KEY);
export const openDemoDashboard = () => window.location.assign('/profileSuperAdmin');
export const demoUser = { uid: 'demo-superadmin', email: DEMO_EMAIL, displayName: 'Demo Superadmin', photoURL: '' };
export const demoProfile = { id: demoUser.uid, email: DEMO_EMAIL, displayName: demoUser.displayName, name: 'Demo', lastname: 'Superadmin', rol: 'superAdmin', readonly: true, blocked: false, favorites: [] };
