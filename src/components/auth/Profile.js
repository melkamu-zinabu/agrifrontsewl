import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from './hooks/useAuthContext';

const UserProfile = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const { user } = useAuthContext();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/user/getuserbyid/${user._id}`);
        const { success, user, message } = response.data;

        if (!success) {
          setError(message);
          return;
        }
        setUserData(user);
      } catch (error) {
        console.log(error);
        setError('An error occurred while fetching user data');
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div>
      <h1>Hi</h1>
      {user && userData && (
        <div>
          <h2>{user._id}</h2>
          <p>Email: {userData.email}</p>
          {/* Render other user fields */}
          {userData.image && (
            <img src={`data:image/jpeg;base64,${userData.image}`} alt="User Image" />
          )}
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default UserProfile;
