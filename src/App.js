import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Layout from './components/layout/Layout';
import Index from './components/landingPage/Index';
import Login from './components/auserauth/Login';
import NewsFeed from './components/farmer/FNewsFeed';
import Register from './components/auserauth/Register';
import RequiredAuth from './components/RequiredAuth';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NewsFeedManager from './components/icPage/NewsFeedManager';

import ResetPassword from './components/auserauth/forgetpassword/XResetpasswordSwithemaoil';
import ResetPasswordPage from './components/auserauth/forgetpassword/XResetpasswordpage';
import UserProfile from './components/admin/UpdateProfile';
import PhoneNumberForm from './components/badmin/Contact';
import SubmitEmail from './components/auserauth/forgetpassword/ResetPasswordWithEmail';
import ChangePasswordForm from './components/auserauth/forgetpassword/Resetpassword';
import NavBar from './components/NavBar';
import AdminNavBar from './components/admin/adminNavBar';
import ManageFarmers from './components/admin/ManageFarmer';
import ManageDAWorker from './components/admin/ManageDAWorker';
import ManageICWorker from './components/admin/ManageIC';
import Dashboard from './components/admin/adminHome';
import IcNavBar from './components/IC/icNavBar';
import Newsfeed from './components/IC/Newsfeed';
import Home from './components/farmer/FarmerHome';
import Product from './components/farmer/product/ProductManager';
import Job from './components/farmer/product/JobManager';
import FNewsFeed from './components/farmer/FNewsFeed';
import Buyerproduct from './components/buyer/Buyerproduct';
import ImageWithOverlay from './components/farmer/FarmerCarousel';
import { useSelector } from 'react-redux';
import UpdateICProfile from './components/IC/UpdateICProfile';
import Messages from './components/IC/Message';
import Farmerprofileupdate from './components/farmer/UpdateFarmerProfile';

import LaborWorkerNavBar from './components/laborworker/laborWorkerNavBar'
import LaborWorkerHome from './components/laborworker/LaborWorkerHome';
import QA from './components/farmer/QA';
import BuyerHome from './components/buyer/BuyerHome';
import UpdateBuyerProfile from './components/buyer/UpdateBuyerProfile';




function App()
{ const user = useSelector((state) => state.user);
const navigate=useNavigate()
 
  return (
    <div className="App" >
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <Routes>
    
      {user && user.role === 'Admin' ? (
              <>
                <Route path='/' element={<Dashboard />} />
                <Route path='Dashboard' element={<Dashboard />} />
                <Route path='ManageFarmers' element={<ManageFarmers />} />
                <Route path='ManageDAWorker' element={<ManageDAWorker />} />
                <Route path='ManageICWorker' element={<ManageICWorker />} />
                <Route path='UserProfile' element={<UserProfile />} />
                
              </>
            ) : user && user.role === 'Farmer' ? (
              <>
                <Route path='/' element={<Home />} />
                <Route path='/Home' element={<Home />} />
                <Route path='/Farmerprofileupdate' element={<Farmerprofileupdate />} />
                <Route path='/farmer/agri-pros' element={<Product />} />
                <Route path='/farmer/agri-jobs' element={<Job />} />
                <Route path='/farmer/news-feed' element={<FNewsFeed />} />
                <Route path='QA' element={<QA />} />
              </>
            ) :user && user.role === 'IC' ? (
              <>
                <Route path='UpdateICProfile' element={<UpdateICProfile />} /> 
                <Route path='Newsfeed' element={<Newsfeed />} />
                <Route path='/' element={<Newsfeed />} />
                <Route path='Messages' element={<Messages />} />
                
              </>
            ): user && user.role === 'Buyer' ? (
              <>
                <Route path='/' element={<BuyerHome />} />
                <Route path='BuyerHome' element={<BuyerHome/>} />
                <Route path='UpdateBuyerProfile' element={<UpdateBuyerProfile/>} />
              </>
            ) : user && user.role === 'Labour' ? (
              <>
                <Route path='' element={<LaborWorkerHome />} />
                <Route path='Farmerprofileupdate' element={<Farmerprofileupdate />} />
                <Route path='LaborWorkerNavBar' element={<LaborWorkerNavBar />} />
                <Route path='LaborWorkerHome' element={<LaborWorkerHome />} />
              </>
            ) : 
             (
              <>
                <Route path='/' element={<Index />} />
                <Route path='sign-in' element={<Login />} />
                <Route path='sign-up' element={<Register />} />
                <Route path='sign-in' element={<Login />} />
               <Route path='ResetPasswordPage/:token' element={<ChangePasswordForm />} />
              </>
)}
     

            <Route path='Dashboard' element={<Dashboard />} />
     
              <Route path='ManageFarmers' element={<ManageFarmers />} />
                <Route path='ManageDAWorker' element={<ManageDAWorker />} />
                <Route path='LaborWorkerHome' element={<LaborWorkerHome />} />


       
      </Routes>
    </div>
  );
}

export default App;
