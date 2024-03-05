import { useLoaderData } from 'react-router-dom';

import { Person } from './api';

export default function About() {
  const person = useLoaderData() as Person;
  return (
    <div>
      <h1>About</h1>
      <p>{person.name}</p>
      <p>{person.id}</p>
      <p>{person.age}</p>
      <p>{person.sport}</p>
    </div>
  );
}
