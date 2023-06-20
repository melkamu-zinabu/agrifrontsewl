import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { logout } from '../auserauth/store';
const AdminNavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <h2 style={{ position: 'absolute', left: '5px' }}>AISS</h2>

            <div style={{ display: 'flex' }}>
              <li className="nav-item">
                <a className="nav-link" href="/admin">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/news-feed">
                  NewsFeed
                </a>
              </li>
              <li>
                <NavDropdown title="Management Accounts" id="navbarDropdown">
                  <NavDropdown.Item as={Link} to="/admin/m-da">
                    DA-WORKER
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/m-fa">
                    Farmer
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/m-ic">
                    IC
                  </NavDropdown.Item>
                </NavDropdown>
              </li>


              <li className="nav-item mx-2">
                <a href="/price-index" className="nav-link">
                  Price Index
                </a>
              </li>
              <li>
                <NavDropdown title={<img src={profileImage} alt="Profile" width="38px" height="38px" style={{ padding: 0 }} />} id="navbarDropdown">
                  <NavDropdown.Item as={Link} to="/updateprofile">
                    Update Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </li>

            
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;
