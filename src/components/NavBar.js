import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { logout } from './auserauth/store';


const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate=useNavigate()

  const [profileImage, setProfileImage] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/user/getuserbyid/${user._id}`);

        const { name, email, image } = response.data;

        if (image) {
          console.log('ggggggggggggggggggg');

          const imageUrl = `data:${image.contentType};base64,${image.data}`;

          setProfileImage(imageUrl); // Set the Base64 encoded image URL to the state
        }
        console.log('User Profile:', { name, email });
        // Do something with the profile data
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (user && user._id) {
      fetchUserProfile();
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    navigate('/sign-in');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <h2 style={{ position: 'absolute', left: '2px' }}>AISS</h2>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown mx-2">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                id="newsFeedDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                NewsFeed
              </Link>
              <ul className="dropdown-menu" aria-labelledby="newsFeedDropdown">
                <li>
                  <Link to="/crop" className="dropdown-item">
                    Crop Information
                  </Link>
                </li>
                <li>
                  <Link to="/tech" className="dropdown-item">
                    New Technology
                  </Link>
                </li>
                <li>
                  <Link to="/policy" className="dropdown-item">
                    Gov't policy
                  </Link>
                </li>
                <li>
                  <Link to="/weather" className="dropdown-item">
                    Weather Information
                  </Link>
                </li>
                <li>
                  <Link to="/price" className="dropdown-item">
                    Price Index Visualization
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="./qa" className="nav-link">
                Q&A
              </Link>
            </li>
            <li className="nav-item dropdown mx-2">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                id="managementPanelDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Management Panel
              </Link>
              <ul className="dropdown-menu" aria-labelledby="managementPanelDropdown">
                <li>
                  <Link to="/agri-pros" className="dropdown-item">
                    Agri-Products
                  </Link>
                </li>
                <li>
                  <Link to="/agri-jobs" className="dropdown-item">
                    Agri-Jobs
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item mx-2">
              <Link to="./price-index" className="nav-link">
                Price Index
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  width="38px"
                  height="38px"
                  style={{ padding: 0 }}
                />
              </Link>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <Link to="/profile" className="dropdown-item">
                    Update Profile
                  </Link>
                </li>
                <li>
                  <Link to="/" className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
