import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const ResetPasswordPage = () => {
  const { token} = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [resetStatus, setResetStatus] = useState(null);
  const navigate=useNavigate()



  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const requestData = {
            newPassword: newPassword,
            resetToken:token
        };
  
        const response = await axios.post('http://localhost:3005/user/passwordresetpage', requestData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

    setResetStatus(response.data.message);
    } catch (error) {
      console.error('Error resetting password:', error.response.data.message);
      setResetStatus('Error resetting password:', error.response.data.message);
    }
  };

  const handleGoBack = () => {
    navigate('/login'); // Redirect to the login page after password reset
  };

  return (
    <div>
      <h1>Reset Password</h1>
      {resetStatus ? (
        <div>
          <p>{resetStatus}</p>
          <button onClick={handleGoBack}>Go Back to Login</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={handlePasswordChange} />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};
export default ResetPasswordPage