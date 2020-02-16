import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <span className="navbar-brand">Travel Log App</span>
      <Link to="/add" className="text-white">
        Add Entry
      </Link>
    </nav>
  );
};

export default Navbar;
