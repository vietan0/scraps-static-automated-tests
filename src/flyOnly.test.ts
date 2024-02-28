import { expect, test } from 'vitest';

import flyOnly, { Supe } from './flyOnly';

const testData: Supe[] = [
  { name: 'Homelander', fly: true },
  { name: 'Queen Maeve', fly: false },
  { name: 'Stormfront', fly: true },
  { name: 'Soldier Boy', fly: false },
  { name: 'A-Train', fly: false },
  { name: 'Ryan', fly: true },
];

test('flyOnly', () => {
  const actual = flyOnly(testData);
  expect(actual).toMatchSnapshot();
});
