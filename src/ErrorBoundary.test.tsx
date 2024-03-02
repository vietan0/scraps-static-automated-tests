import { fireEvent, render, screen } from '@testing-library/react';
import { afterAll, beforeAll, expect, MockInstance, test, vi } from 'vitest';

import { ErrorBoundary } from './ErrorBoundary';

function Bomb({ shouldThrow = false }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error('💣');
  } else return <p>Defused</p>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mockCer: MockInstance<[message?: any, ...optionalParams: any[]], void>;
beforeAll(() => {
  // to clear ErrorBoundary errors in cli
  mockCer = vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterAll(() => {
  vi.restoreAllMocks();
});

test('ErrorBoundary renders fallback UI', () => {
  const { rerender } = render(
    <ErrorBoundary>
      <Bomb shouldThrow />
    </ErrorBoundary>,
  );
  screen.debug();
  expect(console.error).toBeCalledTimes(2);
  expect(screen.getByRole('alert')).toHaveTextContent('There was an error');

  rerender(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  );
  mockCer.mockClear();

  // simulate click
  screen.debug();
  const button = screen.getByText('Try Again');
  fireEvent.click(button);
  expect(console.error).toBeCalledTimes(0);
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});
