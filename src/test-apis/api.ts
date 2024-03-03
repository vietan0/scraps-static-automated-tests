import { IssFullInfo } from './GetIss';

async function fetchIss() {
  const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
  const data = (await res.json()) as IssFullInfo;
  return data;
}

export { fetchIss };
