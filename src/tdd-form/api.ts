async function fetchCatFacts({ id = '0', date }: { id: string; date: string }) {
  const res = await fetch(`https://meowfacts.herokuapp.com/?id=${id}`);
  const data = (await res.json()) as { data: Array<string> };
  return { data, date };
}

export { fetchCatFacts };
