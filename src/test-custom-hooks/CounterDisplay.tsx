import { useState } from 'react';

import useCounter from './useCounter';

export default function CounterDisplay() {
  const { count, increment, decrement } = useCounter();
  const [by, setBy] = useState(1);
  return (
    <div>
      <h1>CounterDisplay</h1>
      <div className="flex gap-4 items-center">
        <button
          onClick={decrement}
          className="px-4 font-bold font-mono text-3xl py-2 bg-orange-200 rounded-md"
        >
          -
        </button>
        <span data-testid="count" className="text-4xl">
          {count}
        </span>
        <button
          onClick={increment}
          className="px-4 font-bold font-mono text-3xl py-2 bg-orange-200 rounded-md"
        >
          +
        </button>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="by">By</label>
        <br />
        <input
          className="px-4 py-2 rounded outline outline-1"
          type="number"
          id="by"
          value={by}
          onChange={(e) => {
            const val = +e.target.value;
            setBy(val > 1 ? val : 1);
          }}
          min={1}
        />
      </form>
    </div>
  );
}
