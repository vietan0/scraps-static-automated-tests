import { useRouteError } from 'react-router-dom';

export default function NotFound() {
  const error = useRouteError();
  return (
    <div>
      <h1>Oops!</h1>
      <i>
        <pre>{JSON.stringify(error!, null, 2)}</pre>
      </i>
    </div>
  );
}
