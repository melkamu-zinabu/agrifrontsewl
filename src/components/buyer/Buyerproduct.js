import React, { useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../auserauth/store';
import axios from 'axios';
import { useState } from 'react';

const Buyerproduct = () => {
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

    return () => {
      // Cleanup function to cancel any pending API requests or subscriptions
    };
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    navigate('/sign-in');
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
      <div className="container">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" >
            <Nav.Link as={Link} to="/buyer" className="nav-link">
              <h6>AISS</h6>
            </Nav.Link>

            <div style={{marginLeft:'3rem' ,display:'flex'}}>
            <Nav.Link as={Link} to="/buyer" className="nav-link">
              <h6>Home</h6>
            </Nav.Link>
            <Nav.Link as={Link} to="/agri-pros" className="nav-link">
              Available-Agri-products
            </Nav.Link>
            <NavDropdown title="Newsfeeds" id="navbarDropdown">
              <NavDropdown.Item as={Link} to="/crop">
                Crop Information
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tech">
                Agri-technology
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/policy">
                Gov't policy
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/weather">
                Seasonal weather information
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/market">
                Market information
              </NavDropdown.Item>
            </NavDropdown>
            
            </div>
          </Nav>
          <Nav>
            <NavDropdown
              title={<img src={profileImage} alt="Profile" width="38px" height="38px" style={{ padding: 0 }} />}
              id="navbarDropdown"
            >
              <NavDropdown.Item as={Link} to="/UpdateBuyerProfile">
                Update Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>

      {/* Custom CSS for spacing between AISS and Home */}
      <style jsx>{`
        .nav-link.aiss-link {
          margin-right: 20px;
        }
      `}</style>
    </Navbar>
  );
};

export default Buyerproduct;
