
//import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './components/auth/context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <Router>
      
        <Routes>
          <Route path="/*" element={<App />} />

        </Routes>
 
    </Router>
    </AuthContextProvider>

  </React.StrictMode>
);


