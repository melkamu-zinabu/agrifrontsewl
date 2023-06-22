import React, { useState } from 'react';
import './style.css';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <h2>AISS</h2>
        <button className="navbar-toggler" type="button" onClick={toggleDropdown}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isDropdownOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#services">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#team">Team</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#footer">Contact</a>
            </li>
          
           
            {user.role ? (
        <>
            <li className="nav-item">
              <a className="nav-link" href="/sign-in">sign in</a>
            </li>
        </>
      ) : (
        <li className="nav-item">
        <a className="nav-link" href="/sign-up">sign-up</a>
      </li>
      )} 
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
