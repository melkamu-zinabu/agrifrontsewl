import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { logout } from './store';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [profileData, setProfileData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/user/getuserbyid/${user._id}`);

        const { name, email ,image} = response.data;
        setProfileData({ name, email }); // Update the component state with the profile data
        if (image){
          console.log('ggggggggggggggggggg')
          
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
  };

  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {profileData && (
            <>
              <p>Profile Data:</p>
              <p>Name: {profileData.name}</p>
              <p>Email: {profileData.email}</p>
              {/* Render additional components 
              or data based on the profile data */}
           
            </>
            
          )}
           {(
            <img src={profileImage} alt="Profile Image" width="25%" height="25%"/>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default UserProfile;




// const base64Image = Buffer.from(image.data, 'binary').toString('base64');
// const imageUrl = `data:${image.contentType};base64,${base64Image}`;