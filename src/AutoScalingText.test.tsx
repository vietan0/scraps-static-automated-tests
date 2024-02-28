import { render } from '@testing-library/react';
import { expect, test } from 'vitest';

import AutoScalingText from './AutoScalingText';

test('render', () => {
  const { container, debug } = render(<AutoScalingText size="text-3xl" />);
  debug();
  expect(container.firstChild).toMatchSnapshot();
});
