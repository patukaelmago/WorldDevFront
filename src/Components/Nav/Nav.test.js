import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nav from './Nav';
jest.mock('react-redux/es/exports', () => ({ useDispatch: () => jest.fn(), useSelector: selector => selector({ reducerAuth: { users: {} }, reducerCart: { cartTotalQuantity: 0 } }) }));
jest.mock('../../context/AuthContext', () => ({ useAuth: () => ({ user: null, logout: jest.fn() }) }));
test('mobile navigation opens accessibly and closes after selecting a page', () => {
  render(<MemoryRouter><Nav /></MemoryRouter>);
  const toggle = screen.getByRole('button', { name: 'Toggle navigation' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(screen.getByRole('link', { name: 'Hotels', exact: true }));
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
