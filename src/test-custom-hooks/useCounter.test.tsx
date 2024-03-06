import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';

import CounterDisplay from './CounterDisplay';
import useCounter from './useCounter';

afterEach(cleanup);

test('simple implementation', () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toBe(0);
});

test('state updater works in isolation', () => {
  const { result } = renderHook((props) => useCounter(props), {
    initialProps: { init: 5, by: 3 },
  });
  expect(result.current.count).toBe(5);
  act(() => result.current.increment());
  expect(result.current.count).toBe(8);
});

test('state updater works in component', () => {
  render(<CounterDisplay />);
  const incrementBtn = screen.getByText('+');

  expect(screen.getByTestId('count')).toHaveTextContent('0');
  fireEvent.click(incrementBtn);
  expect(screen.getByTestId('count')).toHaveTextContent('1');
});

test('rerender should work', () => {
  const { result, rerender } = renderHook((props) => useCounter(props), {
    initialProps: { init: 5, by: 3 } as { init?: number; by?: number },
  });
  expect(result.current.count).toBe(5);
  act(() => result.current.increment());
  expect(result.current.count).toBe(8);

  rerender({ by: 7 });
  act(() => result.current.decrement());
  expect(result.current.count).toBe(1);
});
