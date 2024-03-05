import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { afterEach, expect, test } from 'vitest';

import App from '../App';
import About from './About';
import { getContact, getContacts } from './api';
import Home from './Home';
import NotFound from './NotFound';
import Pricing from './Pricing';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Home />,
        loader: getContacts,
      },
      {
        path: 'about',
        element: <About />,
        loader: () => getContact('15x9'),
      },
      {
        path: 'pricing',
        element: <Pricing />,
      },
    ],
    errorElement: <NotFound />,
  },
];
const testRouter = createMemoryRouter(routes, {
  initialEntries: ['/pricing', '/', '/about'],
  initialIndex: 1,
});

afterEach(cleanup);

test('Going to other route works', async () => {
  render(<RouterProvider router={testRouter} />);

  const linkToAbout = await screen.findByRole('link', { name: /About/i });
  const linkToPricing = await screen.findByRole('link', { name: /Pricing/i });
  expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  fireEvent.click(linkToAbout);
  expect(await screen.findByText('Sarah')).toBeInTheDocument();
  fireEvent.click(linkToPricing);
  expect(await screen.findByRole('heading')).toHaveTextContent(/Pricing/i);
});

test('404 route works', () => {
  const testRouter = createMemoryRouter(routes, {
    initialEntries: ['/typo-in-route'],
  });
  render(<RouterProvider router={testRouter} />);
  expect(screen.queryByRole('heading')).toHaveTextContent('Oops');
});
