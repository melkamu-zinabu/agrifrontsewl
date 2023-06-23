import React, { useState, useEffect } from 'react'
import NavBar from './FNavBar'

import { Box, CircularProgress, Container, MenuItem, Paper, Select, TextField } from '@mui/material';
import img1 from './assets/teff.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../landingPage/copyright';
import MyFooter from '../landingPage/myfooter';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { format } from 'timeago.js';
const FNewsFeed = () =>
{    const [isLoading, setIsLoading] = useState(false);
    const [newsfeed, setNewsfeed] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterByTitle, setFilterByTitle] = useState('');
    const [filterByCategory, setFilterByCategory] = useState('');
    const [filterByDescription, setFilterByDescription] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [search, setSearch] = useState('');
   const [filter, setFilter] = useState('');
   const [totalPages, setTotalPages] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);
   const navigate=useNavigate()
   const [showFullText, setShowFullText] = useState(false);
   const toggleText = () => {
     setShowFullText(!showFullText);
   };
 
   useEffect(() => {
     const fetchData = async () => {
       try {
        setIsLoading(true)
         const response = await axios.get(`http://localhost:3005/news/getnews?page=${currentPage}&limit=3&search=${search}&filter=${filter}`);
         const { data, count } = response.data;
         setNewsfeed(data);
      
         setTotalPages(Math.ceil(count / 3));
       } catch (error) {
         console.error('Error:', error);
       }
       setIsLoading(false)
     };
   
     fetchData();
   }, [search, filter, currentPage]);
   
 
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

    // const newsData = [
    //     { id: 1, title: 'News 1', category: 'category 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.In fermentum et sollicitudin ac orci phasellus egestas.Accumsan in nisl nisi scelerisque eu.Nullam eget felis eget nunc lobortis mattis aliquam faucibus.Sagittis orci a scelerisque purus semper.Commodo nulla facilisi nullam vehicula ipsum a arcu.Risus feugiat in ante metus dictum at tempor.Egestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris.Vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus.Morbi tincidunt ornare massa eget egestas.Vitae semper quis lectus nulla at volutpat diam ut venenatis.Augue ut lectus arcu bibendum at varius vel.Viverra ipsum nunc aliquet bibendum enim facilisis gravida.Fames ac turpis egestas maecenas pharetra.Mattis rhoncus urna neque viverra..', imgUrl: img1 },
    //     { id: 1, title: 'News 1', category: 'category 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.In fermentum et sollicitudin ac orci phasellus egestas.Accumsan in nisl nisi scelerisque eu.Nullam eget felis eget nunc lobortis mattis aliquam faucibus.Sagittis orci a scelerisque purus semper.Commodo nulla facilisi nullam vehicula ipsum a arcu.Risus feugiat in ante metus dictum at tempor.Egestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris.Vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus.Morbi tincidunt ornare massa eget egestas.Vitae semper quis lectus nulla at volutpat diam ut venenatis.Augue ut lectus arcu bibendum at varius vel.Viverra ipsum nunc aliquet bibendum enim facilisis gravida.Fames ac turpis egestas maecenas pharetra.Mattis rhoncus urna neque viverra..', imgUrl: img1 },
    //     { id: 2, title: 'News 2', category: 'category 2', content: 'This is the second news article.', imgUrl: img1 },
    //     { id: 3, title: 'News 3', category: 'category 3', content: 'This is the third news article.', imgUrl: '' },
    //     { id: 4, title: 'News 4', category: 'category 4', content: 'This is the third news article.', imgUrl: '' },
    //     { id: 5, title: 'News 5', category: 'category 5', content: 'This is the third news article.', imgUrl: '' },
    //     { id: 6, title: 'News 6', category: 'category 6', content: 'This is the third news article.', imgUrl: '' },
    //     { id: 1, title: 'News 1', category: 'category 1', content: 'This is the first news article.', imgUrl: '' },
    //     { id: 2, title: 'News 2', category: 'category 1', content: 'This is the second news article.', imgUrl: '' },
    //     { id: 3, title: 'News 3', category: 'category 5', content: 'This is the third news article.', imgUrl: '' },
    //     { id: 4, title: 'News 4', category: 'category 3', content: 'This is the third news article.', imgUrl: '' },
    //     { id: 5, title: 'News 5', category: 'category 5', content: 'This is the third news article.', imgUrl: '' },
    //     { id: 6, title: 'News 6', category: 'category 3', content: 'This is the third news article.', imgUrl: '' }
    // ];

   
    // const filterData = (value) =>
    // {
    //     const filtered = newsfeed.filter((item) =>
    //         item.toLowerCase().includes(value.toLowerCase())
    //     );
    //     setNewsfeed(filtered);
    // };
    // const handleExpand = () =>
    // {
    //     setExpanded((prevExpanded) => !prevExpanded)
    //     setNewsfeed((prevNews) => (expanded ? newsData.slice(0, 3) : newsData));


   // };
    // if (!loading)
    // {
    //     return (<div>
    //         <NavBar />
    //         <div style={{ position: 'relative', marginTop: '25%' }}>Loading...</div>
    //     </div>
    //     )
    // }



    return (
        <div style={{ display: 'block' }}>
            <div style={{ zIndex: 5 }}>
                <NavBar />
            </div>
            <Paper sx={{
                marginTop: '5rem', zIndex: 1,
                backgroundColor: 'white', padding: '1rem', width: '100%',
                display: { xs: 'block', md: 'flex' }
            }}>

         <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Search Input */}
            <Box marginLeft="4rem">
                <TextField
                label="Search by Term"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                variant="outlined"
                size="small"
                />
            </Box>

            {/* Filter Select */}
            <Box marginLeft='1rem'>
                <label style={{ marginRight: '0.5rem' }}>Filter by Category:</label>
                <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                variant="outlined"
                size="small"
                label="Filter by Category"
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="crop">Crop</MenuItem>
                <MenuItem value="tech">Technology</MenuItem>
                <MenuItem value="weather">Weather</MenuItem>
                <MenuItem value="policy">Policy</MenuItem>
                <MenuItem value="priceIndex">Price Index</MenuItem>
                </Select>
            </Box>

            {/* Search and Filter Buttons */}
            </div>

             </Paper>
             

            <div style={{ minHeight: '32rem' }}>
                
                <Paper sx={{ backgroundColor: 'whitesmoke', display: { xs: 'block', md: 'flex' } }}>
                    <Container sx={{ backgroundColor: 'whitesmoke', width: '100%' }}>
                        <h3 >NewsFeed</h3>
           
             
      {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <CircularProgress />
          </div>
        )}
          {!isLoading && (
          <>     {newsfeed.map(item => (
            <Paper sx={{ minWidth: { xs: '60px' }, margin: 'auto 1.0rem' }} elevation={0.4} key={item.id}
            >
                <div>
                    Title:{item.title}
                    <span style={{ marginLeft: '30%' }}>Category:{item.category}</span>
                    <span style={{ marginLeft: '30%' }}>date:{format(item.date)}</span>
                </div>
                <div className='textCenter'>
                    <Paper sx={{ display: { sx: 'block', sm: 'flex' }, marginBottom: '1rem' }}>
                        <img
                           src={`data:${item.image.contentType};base64,${item.image.data}`}
                            maxWidth='600rem'
                            height='150rem'
                            style={{ borderRadius: '2rem' }}

                        />
                        {!showFullText && item.description.split(' ').length>20?(
                            <span
                                style={{ color: 'blue', cursor: 'pointer' }}
                                onClick={toggleText}
                            >
                                See More
                            </span>
                            ):
                        <p style={{ padding: '1rem', textAlign: 'justify' }}>{item.description.split(' ').slice(0, 20).join(' ')}
                        </p>}
                    </Paper>


                </div>



            </Paper>
        ))}
         <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button disabled={currentPage === 1} onClick={handlePreviousPage} style={{ marginRight: '10px' }}>
              <FaArrowLeft />
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button disabled={currentPage === totalPages} onClick={handleNextPage} style={{ marginLeft: '10px' }}>
              <FaArrowRight />
            </button>
          </div></>)}
       
{/*                        
                        <button className='btn btn-primary mb-3' onClick={handleExpand}>
                            {expanded ? 'Show Less...' : 'Show More...'}
                        </button> */}
                    </Container>
                </Paper>
            </div>
        <MyFooter/>
        </div>
    )
}
export default FNewsFeed