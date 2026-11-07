import { render, screen, fireEvent } from '@testing-library/react';
import ImageGallery from './ImageGallery';
test('a property with one photo never renders missing slides or carousel controls', () => {
  render(<ImageGallery name="Sample hotel" images={['/photo.jpg', '', undefined]} />);
  expect(screen.getAllByRole('img')).toHaveLength(1);
  expect(screen.getByRole('img')).toHaveAttribute('src', '/photo.jpg');
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
test('photo navigation wraps and announces the selected slide', () => {
  render(<ImageGallery name="Sample hotel" images={['/first.jpg', '/second.jpg']} />);
  fireEvent.click(screen.getByRole('button', { name: 'Previous photo' }));
  expect(screen.getByRole('img')).toHaveAttribute('src', '/second.jpg');
  expect(screen.getByText('2 / 2')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Next photo' }));
  expect(screen.getByRole('img')).toHaveAttribute('src', '/first.jpg');
});
