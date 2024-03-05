import { useLoaderData } from 'react-router-dom';

import { Person } from './api';

export default function Home() {
  const db = useLoaderData() as Person[];
  return (
    <div>
      <h1>Home</h1>
      {db.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </div>
  );
}
