import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, test } from 'vitest';

import FavNum from './FavNum';

afterEach(cleanup);

test('Render a number input with label Favorite Number', () => {
  render(<FavNum />);
  const input = screen.getByLabelText('Favorite Number');
  const label = screen.getByText('Favorite Number');
  expect(input).toHaveAttribute('type', 'number');
  expect(label).toHaveTextContent(/^Favorite Number$/);
});

test('Show error message when invalid input', async () => {
  render(<FavNum />);
  const user = userEvent.setup();
  const input = screen.getByLabelText(/^Favorite Number$/);

  await user.type(input, '10');
  const alert = screen.getByRole('alert');
  expect(alert).toHaveTextContent('The number is invalid');
});
