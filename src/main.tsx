import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import About from './test-react-router/About.tsx';
import { getContact, getContacts } from './test-react-router/api.ts';
import Home from './test-react-router/Home.tsx';
import NotFound from './test-react-router/NotFound.tsx';
import Pricing from './test-react-router/Pricing.tsx';

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
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
