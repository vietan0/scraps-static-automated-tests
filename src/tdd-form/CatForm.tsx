import { useState } from 'react';

import { fetchCatFacts } from './api';

export default function CatForm() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = await fetchCatFacts(value);
    setResult(data.data[0]);
  }

  return (
    <div className="m-16">
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID</label>
        <input
          type="text"
          name="id"
          id="id"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="p-3 outline outline-1 rounded-md"
        />
        <button className="px-4 ml-4 py-2 rounded-md bg-orange-300">
          Send
        </button>
      </form>
      <p>Result: {result}</p>
    </div>
  );
}
