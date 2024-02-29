import { render } from '@testing-library/react';
import { expect, test } from 'vitest';

import AutoScalingText from './AutoScalingText';

test('render', () => {
  const { container } = render(<AutoScalingText size="text-3xl" />);
  expect(container.firstChild).toMatchSnapshot();
});
