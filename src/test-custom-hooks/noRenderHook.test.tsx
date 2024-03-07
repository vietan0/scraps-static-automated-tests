import { act, render } from '@testing-library/react';
import { test } from 'vitest';

import useCounter from './useCounter';

type ResultType = {
  current: {
    count: number;
    random: string;
    increment: () => void;
    decrement: () => void;
  };
};

// function withoutCurrent(props?: { init?: number; by?: number }) {
//   let value; // A
//   function TestComp(props?: { init?: number; by?: number }) {
//     value = useCounter(props); // B
//     console.log('in <TestComp />', value.random); // B
//     return null;
//   }
//   render(<TestComp {...props} />);
//   return value!; // B
// }

// test('without current', () => {
//   const result = withoutCurrent({ init: 5, by: 8 }); // B, runs once
//   console.log('in test', result.random); // B
//   act(() => result!.decrement()); // rerender <TestComp />, Line 18 - value is now C while result is still B
//   console.log('in test', result.random); // B
// });

function withCurrent(props?: { init?: number; by?: number }) {
  const value = { current: undefined } as unknown as ResultType; // A
  function TestComp(props?: { init?: number; by?: number }) {
    value.current = useCounter(props); // A
    console.log('in <TestComp />', value.current.random);
    return null;
  }
  render(<TestComp {...props} />);
  return value; // A
}

test('with current', () => {
  const result = withCurrent({ init: 5, by: 8 }); // A, runs once
  console.log('in test', result.current.random); // A
  act(() => result.current.decrement()); // rerender <TestComp />, Line 36 - value is still A
  console.log('in test', result.current.random);
});

/* hypothesis: 
  Before: let value --> init value as a value, then useCounter() assigns an object to it 
    --> a difference reference
  After: const value = { current: undefined } --> init value as an object from the start 
    --> the same reference

  Conclusion: using current, the reference of result is sync with value, and stays the same across updates
*/
