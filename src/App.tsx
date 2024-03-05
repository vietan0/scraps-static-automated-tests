import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="p-12" id="App">
      <div className="flex gap-4">
        <Link to="/">App</Link>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/pricing">Pricing</Link>
      </div>
      <Outlet />
    </div>
  );
}
