import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';

import FavNum from './FavNum';

afterEach(cleanup);

test('Render a number input with label Favorite Number', () => {
  render(<FavNum />);
  const label = screen.getByText('Favorite Number');
  expect(label).toHaveTextContent(/^Favorite Number$/);
});

test('Show error message when invalid input', async () => {
  const { rerender } = render(<FavNum />);
  const input = screen.getByLabelText<HTMLInputElement>(/^Favorite Number$/);

  fireEvent.change(input, {
    target: { value: '10' },
  });

  expect(input).toHaveAttribute('max', '9');
  expect(screen.queryByRole<HTMLDivElement>('alert')).toHaveTextContent(
    'The number is invalid',
  );

  rerender(<FavNum max={20} />);
  expect(input).toHaveAttribute('max', '20');
  expect(screen.queryByRole<HTMLDivElement>('alert')).toBeNull();
});
