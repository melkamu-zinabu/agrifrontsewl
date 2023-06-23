
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './FNavBar';
import MyFooter from '../landingPage/myfooter';
import { Card, Typography, CardMedia, CardActions, CardContent, CardActionArea } from '@mui/material';

import './qa.css';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
function QA() {
 
    const [profileData, setProfileData] = useState([]);
    const [profileImage, setProfileImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const role='DA';
    
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;
  const handleNext = () => {
    const nextIndex = startIndex + 1;
    setStartIndex(nextIndex >= profileData.length ? 0 : nextIndex);
  };
  const handlePrev = () => {
    const nextIndex = startIndex - 1;
    setStartIndex(nextIndex >= profileData.length ? 0 : nextIndex);
  };

  const visibleItems = profileData.slice(startIndex, startIndex + itemsPerPage);
    useEffect(() => {
      fetchData(currentPage);
    }, [currentPage]);
  
    const fetchData = async (page) => {
      try {
        const response = await axios.get(`http://localhost:3005/user/getallusers?page=${page}&limit=10&role=${role}`);
  
        const { data, count } = response.data;
        setProfileData(data);
        console.log(data)
        setTotalPages(Math.ceil(count / 10));
        if (data.length > 0 && data[0].image) {
          const imageUrl = `data:${data[0].image.contentType};base64,${data[0].image.data}`;
          setProfileImage(imageUrl);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    
      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };

  
  return (
    <>
       <div>
      <NavBar />
      <div style={{ marginTop: '5rem' }}>
        <h5>Click one of the links listed below to ask any question.</h5>
      </div>
      <div className='wrapper' style={{ margin: '3% auto',textAlign:'center' }}>
      {/* <button
            style={{
                marginLeft: '15px',
                marginRight: '9px',
               
                border: 'none',
            }}
            onClick={handlePrev}
            >
            <ChevronLeft />
</button> */}
   {visibleItems.map((item) => (
          <div
            key={item._id}
            className='item'
            style={{
            
              minWidth: '220px',
              minHeight: '160px',
              marginRight: '10px',
              padding: '3px',
            
            }}
          >
            <img
               src={`data:${item.image.contentType};base64,${item.image.data}`}
                       
              alt="image"
              width='80px'
              height='80px'
              style={{ borderRadius: '35px' }}
            />
            <h6>{item.name}</h6>
            <p>{item.phone}</p>
            <a href={item.chatlink}>Chat Link</a>
          </div>
          
        ))}
      
        {/* <button style={{marginLeft:'9px',marginRight:'0'}} onClick={handleNext}><ChevronRight/></button> */}
      </div>
     
         
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button disabled={currentPage === 1} onClick={handlePreviousPage} style={{ marginRight: '10px' }}>
              <FaArrowLeft />
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button disabled={currentPage === totalPages} onClick={handleNextPage} style={{ marginLeft: '10px' }}>
              <FaArrowRight />
            </button>
          </div>
      
      
     
    </div>
 
    
    </>
  );
}

export default QA;

































//   const data = [
//     {
//       name: 'melkamu zinabu',
//       photo: melkamu,
//       ph_number: '0900631287',
//       link: 'https://t.me/Mzzw2012'
//     },
//     {
//         name: 'melkamu zinabu',
//         photo: melkamu,
//         ph_number: '0900631287',
//         link: 'https://t.me/Mzzw2012'
//       },
//       {
//         name: 'melkamu zinabu',
//         photo: melkamu,
//         ph_number: '0900631287',
//         link: 'https://t.me/Mzzw2012'
//       },
//       {
//         name: 'melkamu zinabu',
//         photo: melkamu,
//         ph_number: '0900631287',
//         link: 'https://t.me/Mzzw2012'
//       },
//     {
//       name: 'samuel kibret',
//       photo: samuel,
//       ph_number: '0970220583',
//       link: 'https://t.me/samuelKibret'
//     },
//     {
//       name: 'Sewlesew Biazen',
//       photo: sewlesew,
//       ph_number: '0961718044',
//       link: 'https://t.me/u_and_me_1'
//     },
//     {
//       name: 'Yonas Kebede',
//       photo: yonas,
//       ph_number: '0953055202',
//       link: 'https://t.me/yonas_k_g'
//     },
//     // Add more data objects as needed
//   ];

 