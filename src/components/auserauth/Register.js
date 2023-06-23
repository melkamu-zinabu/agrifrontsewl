import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Link,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import NavBar from '../landingPage/NavBar';
import Footer from '../landingPage/copyright';
import axios from 'axios';
import { login } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const theme = createTheme();

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState(null); // New state for file upload
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('');
    setImage(null);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
      formData.append('role', role);
      formData.append('image', image); // Include file in form data

      const response = await axios.post('http://localhost:3005/user/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        const userData = response.data;
        setSuccess(true);
        setError('');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('');
        setImage(null);
         dispatch(login(userData));
        sessionStorage.setItem('user', JSON.stringify(userData));

        setTimeout(() => {
          setError('');
          setSuccess(false)
          setLoading(false); // Set loading state to false after a delay
         navigate('/sign-in');
        }, 1500);
      }
    } catch (error) {
      setSuccess(false);
      setLoading(false); // Set loading state to false
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during registration.');
      }
    }
  };

  return (
    <div>
      <NavBar />

      <ThemeProvider theme={theme}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={8}>
            <Paper elevation={5} sx={{ padding: '20px', margin: '5rem auto' }}>
              <Typography variant="h4" align="center" gutterBottom>
                Register
              </Typography>
              <form onSubmit={handleSubmit}>
           
                {success && <p>User registered successfully.</p>}
                {error && <p>{error}</p>}

                <TextField
                  type="email"
                  label="Email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  label="Username"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  required
                />

                <Select
                  labelId="select-label"
                  id="select-input"
                  label="Select Role"
                  fullWidth
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  defaultValue=""
                >
                  <MenuItem value="">Select Role</MenuItem>
                  <MenuItem value="Farmer">Farmer</MenuItem>
                 
                
                  <MenuItem value="Labour">Labour Worker</MenuItem>
                  <MenuItem value="Buyer">Buyer</MenuItem>
                </Select>

                <TextField
                  type="password"
                  label="Password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  type="password"
                  label="Confirm Password"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  margin="normal"
                  required
                />
                <input
                  accept="image/*"
                  type="file"
                  id="file"
                  style={{ display: 'none' }}
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="file">
                  <Button component="span" startIcon={<CloudUploadOutlinedIcon />} fullWidth>
                    Upload Image
                  </Button>
                </label>
                {image && (
                  <Typography variant="body2" align="center">
                    Selected image: {image.name}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Register'
                  )}
                </Button>
              </form>
              <Typography variant="body2" align="center" marginTop="10px">
                Already Registered?{' '}
                <Link href="/sign-in">Login</Link>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
      <Footer />
    </div>
  );
};

export default Register;
