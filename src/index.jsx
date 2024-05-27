import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from "react-router-dom";
import './index.css'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  
  {
    element: <App />,
    path:'/'
  },
]);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
