import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Layout from './components/layout/Layout';
import Job from './components/product/JobManager';
import Product from './components/product/ProductManager';
import Index from './components/landingPage/Index';
import Login from './components/auserauth/Login';
import NewsFeed from './components/NewsFeed';
import Register from './components/auserauth/Register';
import RequiredAuth from './components/RequiredAuth';
import { Routes, Route } from 'react-router-dom';
import NewsFeedManager from './components/icPage/NewsFeedManager';

import ResetPassword from './components/auserauth/forgetpassword/XResetpasswordSwithemaoil';
import ResetPasswordPage from './components/auserauth/forgetpassword/XResetpasswordpage';
import UserProfile from './components/auserauth/UpdateProfile';
import PhoneNumberForm from './components/badmin/Contact';
import SubmitEmail from './components/auserauth/forgetpassword/ResetPasswordWithEmail';
import ChangePasswordForm from './components/auserauth/forgetpassword/Resetpassword';
import NavBar from './components/NavBar';
import AdminNavBar from './components/admin/adminNavBar';
import ManageFarmers from './components/admin/ManageFarmer';




function App()
{
 
  return (
    <div className="App" >
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path='sign-up' element={<Register />} />
        <Route path='sign-in' element={<Login />} />
        <Route path='/SubmitEmail' element={<SubmitEmail />} />
        <Route path='ResetPasswordPage/:token' element={<ChangePasswordForm />} />
          {/* Public routes */}
           {/* <Home /> : <Navigate to="/login" />
          <Route path='sign-in' element={<Login />} /> */}
           
           <Route path='adminNavBar' element={<AdminNavBar />} />
          <Route path='updateprofile' element={<UserProfile />} />
          <Route path='ManageFarmers' element={<ManageFarmers />} />

          <Route path='resetpw' element={<ResetPassword />} />
          <Route path='ResetPasswordPage/:token' element={<ChangePasswordForm />} />
          <Route path='news-feed' element={<NewsFeed />} />
            <Route path='agri-pros' element={<Product />} />
         
          <Route path='/' element={<Index />} />
          <Route path='agri-jobs' element={<Job />} />
          {/* SendResetEmail */}
          
        
          
          <Route path='admin/manage-news' element={<NewsFeedManager />} />

          {/* Private Routes */}
          <Route element={<RequiredAuth />}>
            <Route path='news-feed' element={<NewsFeed />} />
            <Route path='agri-pros' element={<Product />} />

          </Route>


        </Route>
      </Routes>
    </div>
  );
}

export default App;
