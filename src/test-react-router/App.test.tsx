import { fireEvent, render, screen } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { expect, test } from 'vitest';

import App from '../App';
import About from './About';
import NotFound from './NotFound';
import Pricing from './Pricing';

// copy from main.tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'pricing',
        element: <Pricing />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

test('Going to other route works', async () => {
  render(<RouterProvider router={router} />);

  const linkToAbout = screen.getByText(/About/i);
  expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  fireEvent.click(linkToAbout);
  expect(screen.queryByRole('heading')).toHaveTextContent(/About/i);
});
