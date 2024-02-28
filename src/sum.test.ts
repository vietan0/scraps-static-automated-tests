import { expect, test } from 'vitest';

import sum from './sum';

test('sum func works', () => {
  const actual = sum(3, 5);
  expect(actual).toBe(8);
});

console.log(typeof window);
