import { useState } from 'react';

import { fetchIss } from './api';

export type IssInfo = {
  name: string;
  id: string;
  latitude: number;
};

export type IssFullInfo = IssInfo & {
  [key: string]: number | string;
};

export default function GetIss() {
  const [issInfo, setIssInfo] = useState<IssInfo>({} as IssInfo);

  async function handleClick() {
    const data = await fetchIss();
    setIssInfo({ name: data.name, id: data.id, latitude: data.latitude });
  }
  return (
    <div className="m-16">
      <button
        onClick={handleClick}
        className="px-4 py-2 rounded-md bg-yellow-300"
      >
        Fetch ISS
      </button>
      {Object.keys(issInfo).length > 0 && (
        <>
          <p>Name: {issInfo.name}</p>
          <p>ID: {issInfo.id}</p>
          <p>Latitude: {issInfo.latitude}</p>
        </>
      )}
    </div>
  );
}
