// not using sleep at first
function sleep() {
  return new Promise((r) => setTimeout(r, 900));
}

type Person = {
  id: string;
  name: string;
  age: number;
  sport: string;
};

const db: Person[] = [
  {
    id: 'i3la',
    name: 'John',
    age: 30,
    sport: 'basketball',
  },
  {
    id: '15x9',
    name: 'Sarah',
    age: 22,
    sport: 'volleyball',
  },
];

async function getContacts() {
  await sleep();
  return db;
}

async function getContact(id: string) {
  await sleep();
  return db.find((p) => p.id === id)!;
}

export { getContact, getContacts };
export type { Person };
