import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';

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

afterEach(() => {
  cleanup();
  vi.mocked(fetchCatFacts).mockClear();
});

function renderForm() {
  render(<CatForm />);
  const input = screen.getByLabelText(/id/i);
  const button = screen.getByText(/send/i);
  const result = screen.getByText(/result/i);

  fireEvent.change(input, { target: { value: '9' } });
  fireEvent.click(button);
  return { result };
}

test('CatForm happy path', async () => {
  const beginWindow = Date.now();
  const { result } = renderForm();

  const endWindow = Date.now();
  const timeCalled = vi.mocked(fetchCatFacts).mock.calls[0][0].date;
  const timeNum = Date.parse(timeCalled);

  expect(fetchCatFacts).toHaveBeenCalledTimes(1);
  expect(fetchCatFacts).toHaveBeenCalledWith({ id: '9', date: timeCalled });
  expect(timeNum).toBeGreaterThanOrEqual(beginWindow);
  expect(timeNum).toBeLessThanOrEqual(endWindow);

  console.log(vi.mocked(fetchCatFacts).mock.results);
  await waitFor(() => {
    expect(result).toHaveTextContent('Post 9: Cat has 4 thumbs and 8 legs');
  });
});

test('CatForm error path', async () => {
  vi.mocked(fetchCatFacts).mockRejectedValueOnce({
    data: { data: null },
    error: new Error('lol noob'),
  });
  const { result } = renderForm();
  const timeCalled = vi.mocked(fetchCatFacts).mock.calls[0][0].date;

  expect(fetchCatFacts).toHaveBeenCalledTimes(1);
  expect(fetchCatFacts).toHaveBeenCalledWith({
    id: '9',
    date: timeCalled,
  });

  console.log(vi.mocked(fetchCatFacts).mock.results);
  await waitFor(() => {
    expect(result).toHaveTextContent('Error');
  });
});
