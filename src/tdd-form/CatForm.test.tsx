import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { fetchCatFacts } from './api';
import CatForm from './CatForm';

vi.mock('./api', () => {
  return {
    fetchCatFacts: vi.fn(
      async ({ id = '0', date }: { id: string; date: string }) => ({
        data: {
          data: [`Post ${id}: Cat has 4 thumbs and 8 legs`],
          date,
        },
      }),
    ),
    meow: vi.fn(() => console.log('woof')),
  };
});

test('CatForm works', async () => {
  render(<CatForm />);
  const input = screen.getByLabelText(/id/i);
  const button = screen.getByText(/send/i);
  const result = screen.getByText(/result/i);

  const beginWindow = Date.now();

  fireEvent.change(input, { target: { value: '9' } });
  fireEvent.click(button);
  expect(fetchCatFacts).toHaveBeenCalledTimes(1);

  const endWindow = Date.now();

  const timeCalled = vi.mocked(fetchCatFacts).mock.calls[0][0].date;
  const timeNum = Date.parse(timeCalled);

  expect(fetchCatFacts).toHaveBeenCalledWith({
    id: '9',
    date: timeCalled,
  });
  expect(timeNum).toBeGreaterThanOrEqual(beginWindow);
  expect(timeNum).toBeLessThanOrEqual(endWindow);

  await waitFor(() => {
    expect(result).toHaveTextContent('Post 9: Cat has 4 thumbs and 8 legs');
  });
});
