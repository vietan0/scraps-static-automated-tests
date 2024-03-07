import { useState } from 'react';
import { createPortal } from 'react-dom';

export default function Popup({
  children = <div>Default</div>,
}: {
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen((p) => !p)}>Toggle Modal</button>
      {isOpen && createPortal(<div id="modal">{children}</div>, document.body)}
    </div>
  );
}
