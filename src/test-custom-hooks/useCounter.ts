import { useState } from 'react';

export default function useCounter(args?: { init?: number; by?: number }) {
  const init = args?.init || 0;
  const by = args?.by || 1;
  const [count, setCount] = useState(init);

  const increment = () => setCount((p) => p + by);
  const decrement = () => setCount((p) => p - by);

  return { count, random: Math.random().toFixed(2), increment, decrement };
}
