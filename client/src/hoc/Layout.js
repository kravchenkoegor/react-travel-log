import React from 'react';
import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
  return (
    <div className="app">
      <Navbar />

      {children}
    </div>
  );
};

export default Layout;
