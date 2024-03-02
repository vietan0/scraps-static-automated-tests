import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';

import MovingComp from './MovingComp';

test('Box disappears when click button', async () => {
  render(<MovingComp skipAnimations />);
  const btn = screen.getByText('Toggle');
  const box = screen.getByText('Box');

  expect(box).toBeInTheDocument();
  const user = userEvent.setup();
  await user.click(btn);
  expect(box).not.toBeInTheDocument();
});
