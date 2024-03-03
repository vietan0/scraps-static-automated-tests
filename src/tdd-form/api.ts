async function fetchCatFacts(id: string = '0') {
  const res = await fetch(`https://meowfacts.herokuapp.com/?id=${id}`);
  const data = (await res.json()) as { data: Array<string> };
  return data;
}

export { fetchCatFacts };
