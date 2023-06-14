import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Helmet } from 'react-helmet'

import './index.css';

import { router } from './router';

const root = ReactDOM.createRoot(
  // document.body.classList.add('background-red');
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
