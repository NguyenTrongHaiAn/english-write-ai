// src/layouts/GetstartLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Getstartnavbar from '../components/getstartnavbar.jsx';


const GetstartLayout = () => {
  return (
    <>

      <Getstartnavbar />

      <main className="layout-content-area">
        <Outlet />
      </main>
    </>
  );
};

export default GetstartLayout;