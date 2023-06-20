// import axios from "axios";
// import { useState } from "react";

// const ResetPassword = () => {
//   const [email, setEmail] = useState('');
//   const [emailSent, setEmailSent] = useState(false);
//   const [resetStatus, setResetStatus] = useState('');
//   const [error, setError] = useState('');

//   const handleSendEmail = async (e) => {
//     e.preventDefault();
//     try {
//       const requestData = {
//         email: email
//       };

//       const response = await axios.post('http://localhost:3005/user/resetpwbyemail', requestData, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.status === 201) {
//         setEmailSent(true);
//         setResetStatus('Email sent. Please check your inbox for further instructions.');
//       }
//     } catch (error) {
//       setEmailSent(false);
//       if (error.response) {
//         console.log("errrrrr")
//         setResetStatus(error.response.data.message);
//       } else {
//         setResetStatus('An error occurred during registration.');
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Reset Password</h1>
//       {!emailSent ? (
//         <form onSubmit={handleSendEmail}>
//           <div>
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Send Reset Email</button>
//         </form>
//       ) : (
//         <p>{resetStatus}</p>
//       )}
//     </div>
//   );
// };

// export default ResetPassword;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResetWithEmail = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Update the email value if it changes
    // This ensures that the email value is always up to date
    setEmail(email);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3005/user/resetpwbyemail', { email });
      if (response.status === 200) {
        setMessage(response.data.message);
        setError('');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Failed to send reset email.');
      }
      setMessage('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ResetWithEmail;

