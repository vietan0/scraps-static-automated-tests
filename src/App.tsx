import { ErrorBoundary } from './ErrorBoundary';

function Bomb({ shouldThrow = false }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error('💣');
  } else return <p>Defused</p>;
}
export default function App() {
  return (
    <div id="App">
      {/* <LogComp /> */}
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    </div>
  );
}
