import { useEffect } from 'react';

export default function LogComp({ seed = 1 }: { seed?: number }) {
  useEffect(() => {
    console.log('hello there');
  }, [seed]);

  return <div>LogComp</div>;
}
