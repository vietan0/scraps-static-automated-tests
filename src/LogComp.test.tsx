import { render } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import LogComp from './LogComp';

test('log times', () => {
  const spy = vi.spyOn(console, 'log');
  const { rerender } = render(<LogComp />);

  expect(spy).toBeCalledTimes(1);
  console.info(spy.mock.calls); // array of 1
  rerender(<LogComp seed={2} />);
  expect(spy).toBeCalledTimes(2);
  console.info(spy.mock.calls); // array of 2

  spy.mockRestore();
  console.info(spy.mock.calls); // array of 0
  console.log('bird');
  console.log('bird');
  console.log('bird');
  console.log('bird');
  console.log('bird');
  console.log('bird');
  console.log('bird');
  console.log('bird');
  console.info(spy.mock.calls); // array of 0
});
