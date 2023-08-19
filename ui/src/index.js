import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from './routes/error-page';
import Blog from './routes/blog';
import PixelTester from './routes/pixel-tester';
import Test from './routes/test';

import ReactPixel from 'react-facebook-pixel';

const advancedMatching = {}; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
const options = {
  autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
  debug: true, // enable logs
};

ReactPixel.init('1046126335969327', advancedMatching, options);
console.log("ReactPixel initialized.");
ReactPixel.pageView();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/blog/:blogId",
    element: <Blog />,
  },
  {
    path: "/pixel-tester",
    element: <PixelTester />,
    // errorElement: <ErrorPage />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
