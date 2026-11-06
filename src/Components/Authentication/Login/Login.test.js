import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import AuthProvider from '../../../context/AuthContext';
import { DEMO_EMAIL, DEMO_PASSWORD, isDemoActive, setDemoActive, openDemoDashboard } from '../../../demoSession';
import Login from './Login';
jest.mock('../../../firebase', () => ({ auth: {} }));
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(), signOut: jest.fn(), signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(), GoogleAuthProvider: jest.fn(), signInWithPopup: jest.fn(), sendPasswordResetEmail: jest.fn()
}));
jest.mock('../../../demoSession', () => ({ ...jest.requireActual('../../../demoSession'), openDemoDashboard: jest.fn() }));
beforeEach(() => {
  setDemoActive(false);
  signOut.mockResolvedValue(undefined);
  onAuthStateChanged.mockImplementation((auth, listener) => { listener(null); return jest.fn(); });
});
afterEach(() => { setDemoActive(false); });
function showLogin() { render(<MemoryRouter><AuthProvider><Login /></AuthProvider></MemoryRouter>); }
test('the prefilled Login form enters the read-only superadmin demo without Firebase password authentication', async () => {
  showLogin();
  expect(screen.getByLabelText('Usuario o email')).toHaveValue(DEMO_EMAIL);
  expect(screen.getByLabelText('Contraseña')).toHaveValue(DEMO_PASSWORD);
  const submit = screen.getByRole('button', { name: 'Login', exact: true });
  expect(submit).toBeEnabled();
  fireEvent.click(submit);
  await waitFor(() => expect(openDemoDashboard).toHaveBeenCalledTimes(1));
  expect(isDemoActive()).toBe(true);
  expect(signOut).toHaveBeenCalledTimes(1);
  expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
});
test('a mistyped demo password cannot create a demo session or fall through to Firebase', async () => {
  showLogin();
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'incorrect-password' } });
  fireEvent.click(screen.getByRole('button', { name: 'Login', exact: true }));
  await screen.findByText('La contraseña no es correcta. Usá los datos demo que aparecen arriba.');
  expect(isDemoActive()).toBe(false);
  expect(openDemoDashboard).not.toHaveBeenCalled();
  expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
});
test('copied demo credentials tolerate surrounding whitespace', async () => {
  showLogin();
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: ` ${DEMO_PASSWORD} ` } });
  fireEvent.click(screen.getByRole('button', { name: 'Login', exact: true }));
  await waitFor(() => expect(openDemoDashboard).toHaveBeenCalled());
  expect(isDemoActive()).toBe(true);
});
