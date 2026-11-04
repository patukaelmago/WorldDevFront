import { render, screen, waitFor } from '@testing-library/react';
import ReadOnlyDemo from './ReadOnlyDemo';
jest.mock('../../context/AuthContext', () => ({ useAuth: jest.fn() }));
test('demo keeps dashboard navigation and selection available while locking editing and writes', async () => {
  const { rerender } = render(<ReadOnlyDemo><form><input aria-label="Name" defaultValue="Sample" /><select aria-label="Hotel"><option>Sample hotel</option></select><button type="submit">Save</button><button type="button">Upload files</button></form><button type="button">Delete</button><a href="/home/modifyHotel"><button type="button">Modify</button></a><button type="button">Back</button></ReadOnlyDemo>);
  expect(screen.getByLabelText('Name')).toHaveAttribute('readonly');
  expect(screen.getByLabelText('Hotel')).toBeEnabled();
  for (const name of ['Save','Upload files','Delete']) expect(screen.getByRole('button',{name})).toBeDisabled();
  for (const name of ['Modify','Back']) expect(screen.getByRole('button',{name})).toBeEnabled();
  rerender(<ReadOnlyDemo><button type="button">Cancel</button></ReadOnlyDemo>);
  await waitFor(() => expect(screen.getByRole('button',{name:'Cancel'})).toBeDisabled());
});
