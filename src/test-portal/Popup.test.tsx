import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import Popup from './Popup';

test('Popup renders children', () => {
  render(
    <Popup>
      <div data-testid="test-div">Test Child</div>
    </Popup>,
  );
  const toggleBtn = screen.getByText('Toggle Modal');

  fireEvent.click(toggleBtn);
  expect(screen.getByTestId('test-div')).toHaveTextContent('Test Child');
  screen.debug();
  fireEvent.click(toggleBtn);
  expect(screen.queryByTestId('test-div')).not.toBeInTheDocument();
});
