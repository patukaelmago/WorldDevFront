import axios from 'axios';
import { auth } from './firebase';
import { API_URL } from './api';
import { setDemoActive, DEMO_MODE } from './demoSession';
jest.mock('./firebase', () => ({ auth: { currentUser: { getIdToken: jest.fn(async () => 'test-owner-token') } } }));
beforeEach(() => { auth.currentUser.getIdToken.mockResolvedValue('test-owner-token'); });
afterEach(() => { setDemoActive(false); jest.clearAllMocks(); });
test('demo requests never carry a real Firebase token', async () => {
  setDemoActive(true);
  const adapter = jest.fn(async config => ({ data: {}, status: 200, statusText: 'OK', headers: {}, config }));
  await axios.get(`${API_URL}/users/admins`, { adapter, headers: { Authorization: 'Bearer previous-token' } });
  const config = adapter.mock.calls[0][0];
  expect(config.headers.Authorization).toBeUndefined();
  expect(config.headers['X-World-Developers-Demo']).toBe(DEMO_MODE);
  expect(auth.currentUser.getIdToken).not.toHaveBeenCalled();
});
test.each(['post','put','patch','delete'])('demo %s is rejected before it reaches the network', async method => {
  setDemoActive(true);
  const adapter = jest.fn();
  await expect(axios.request({ method, url: `${API_URL}/hotels`, adapter })).rejects.toMatchObject({ code: 'ERR_DEMO_READONLY' });
  expect(adapter).not.toHaveBeenCalled();
});
test('ordinary sessions retain their existing Firebase authentication', async () => {
  const adapter = jest.fn(async config => ({ data: {}, status: 200, statusText: 'OK', headers: {}, config }));
  await axios.get(`${API_URL}/users/admins`, { adapter });
  expect(adapter.mock.calls[0][0].headers.Authorization).toBe('Bearer test-owner-token');
  expect(adapter.mock.calls[0][0].headers['X-World-Developers-Demo']).toBeUndefined();
});
