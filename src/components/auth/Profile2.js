// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuthContext } from './hooks/useAuthContext';

// const UserProfile = () => {
//   const { user } = useAuthContext();
//   const [imageSrc, setImageSrc] = useState(null);
//   const [error, setError] = useState(null);
//   const 
//   useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3005/user/getimage/${user._id}`);

//         if (response.data.success) {
//           setImageSrc(response.data.image);
//         } else {
//           setError(response.data.message);
//         }
//       } catch (error) {
//         console.log(error);
//         setError('An error occurred while fetching the user image');
//       }
//     };

//     if (user && user.image) {
//       fetchImage();
//     }
//   }, [user]);

//   return (
//     <div>
//       <h1>Hi</h1>
//       {user && (
//         <div>
//           <h2>{user._id}</h2>
//           <p>Email: {user.email}</p>
//           {/* Render other user fields */}
//           {imageSrc && <img src={`data:image/jpeg;base64,${imageSrc}`} alt="User Image" />}
//         </div>
//       )}
//       {error && <p>Error: {error}</p>}
//     </div>
//   );
// };

// export default UserProfile;
