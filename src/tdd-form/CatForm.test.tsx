import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { fetchCatFacts } from './api';
import CatForm from './CatForm';

vi.mock('./api');
vi.mocked(fetchCatFacts).mockResolvedValueOnce({
  data: ['Each cat has 5 legs, but a kitten only has 4 and a half.'],
});

test('CatForm works', async () => {
  render(<CatForm />);
  const input = screen.getByLabelText(/id/i);
  const button = screen.getByText(/send/i);
  const result = screen.getByText(/result/i);

  expect(result).not.toHaveTextContent(/cat|kitten/i);
  fireEvent.change(input, { target: { value: '9' } });
  fireEvent.click(button);
  expect(fetchCatFacts).toHaveBeenCalledTimes(1);
  expect(fetchCatFacts).toHaveBeenCalledWith('9');
  await waitFor(() => {
    expect(result).toHaveTextContent(/cat|kitten/i);
    screen.debug(result);
  });
});
