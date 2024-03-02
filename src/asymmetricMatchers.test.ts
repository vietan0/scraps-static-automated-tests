import { expect, test } from 'vitest';

test('asymmetric matchers is loose', () => {
  const actual = {
    name: 'Annyong',
    age: 23,
    pet: 'cat',
  };

  // symmetric
  // expect(actual).toBe(expected);
  // expect(actual).toEqual(expected);
  // expect(actual).toStrictEqual(expected);

  // asymmetric
  // expect(actual).toEqual(expect.any(Object));
  // expect(actual).toEqual({ name: expect.any(String) });
  expect(actual).toEqual(expect.objectContaining({ name: expect.any(String) }));
});
