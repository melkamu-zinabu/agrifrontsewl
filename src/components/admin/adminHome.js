import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavBar from './adminNavBar';
import { Paper } from '@mui/material';
import Footer from '../landingPage/copyright';
import '../landingPage/style.css';

function Dashboard() {
  const [counta, setCounta] = useState(0);
  const [countb, setCountb] = useState(0);
  const [countc, setCountc] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  const rolea = 'Farmer';
  const roleb = 'DA';
  const rolec = 'IC';

  useEffect(() => {
    axios
      .get(`http://localhost:3005/user/getallusers?role=${rolea}`)
      .then(response => {
        setCounta(response.data.count);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`http://localhost:3005/user/getallusers?role=${roleb}`)
      .then(response => {
        setCountb(response.data.count);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`http://localhost:3005/user/getallusers?role=${rolec}`)
      .then(response => {
        setCountc(response.data.count);
        setLoading(false); // Set loading state to false after data is fetched
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const cardStyle = {
    display: 'inline-block',
    width: '30%',
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '20px',
    margin: '10px',
    textAlign: 'center',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)',
    transition: 'box-shadow 0.3s',
    cursor: 'pointer',

    // Hover effect
    ':hover': {
      boxShadow: '10px 0px 10px 0px rgba(0,0,0,0.8)',
    },
  };

  if (loading) {
    return <div>Loading...</div>; // Render loading state while data is being fetched
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Paper sx={{ backgroundColor: '', marginTop: '4rem', flex: 1 }}>
        <AdminNavBar />
        <div>
          <h1>Dashboard</h1>
          <div>
            <div className='zoom-out' style={cardStyle}>
              <h2>Farmers</h2>
              <p>{counta}</p>
            </div>
            <div className='zoom-out' style={cardStyle}>
              <h2>DA</h2>
              <p>{countb}</p>
            </div>
            <div className='zoom-out' style={cardStyle}>
              <h2>ICs</h2>
              <p>{countc}</p>
            </div>
          </div>
        </div>
      </Paper>
      <Footer />
    </div>
  );
}

export default Dashboard;
