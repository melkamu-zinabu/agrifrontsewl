import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Typography, Button, CircularProgress, TextField, Box } from '@mui/material';
import {Select, MenuItem } from '@mui/material';
import Footer from '../Footer';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import IcNavBar from './icNavBar';
import MyFooter from '../landingPage/myfooter';
import { useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';

const Newsfeed = () => {
  const user = useSelector((state) => state.user);
  const [newsfeed, setNewsfeed] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate=useNavigate()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/news/getnewsbyuserid?page=${currentPage}&limit=3&id=${user._id}&search=${search}&filter=${filter}`);
        const { data, count } = response.data;
        setNewsfeed(data);
        setTotalPages(Math.ceil(count / 3));
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, [search, filter, currentPage]);
  

  const handleAddNewsfeed = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('image', image);
      formData.append('id', user._id);

      const response = await axios.post(`http://localhost:3005/news/addnews`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setSuccess(true);
        setError('');
        setTitle('');
        setDescription('');
        setCategory('');
        setImage(null);
       

        setTimeout(() => {
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

  const handleEditNews = async (index) => {
    try {
      const newsId = newsfeed[index]._id;
      await axios.post(`http://localhost:3005/news/updatenews/${newsId}`);

      

      alert('newsfeed updated successfully.');
    } catch (error) {
      console.error('Error deleting newsfeed:', error);
    }
  };

  const handleDeleteNews = async (id) => {
 
      axios
      .delete(`http://localhost:3005/news/deletenews/${id}`)
      .then((response) => {
        setNewsfeed(newsfeed.filter((farmer) => farmer._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
     

  };

  return (
    <div>
      <div style={{ position: 'fixed', top: '0px', left: '0px' }}>
        <IcNavBar />
      </div>
      <Paper sx={{ display: { xs: 'block', sm: 'flex' }, fontSize: { xs: '10px', sm: '20px' }, marginTop: '5rem' }}>
     
        <div className="container" style={{ display: 'block', margin: '1rem', backgroundColor: 'whitesmoke', maxHeight: '33rem', maxWidth: '25%' }}>
          <h2>ADD Newsfeed</h2>
          <form onSubmit={handleAddNewsfeed}>
            <div>
            <Select
                  labelId="select-label"
                  id="select-input"
                  placeholder='select category'
                  fullWidth
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Select category"
                  required
                >
                  <MenuItem defaultValue="crop">
                    Select Category
                  </MenuItem>
                  <MenuItem value="crop">crop</MenuItem>
                  <MenuItem value="tech">technology</MenuItem>
                  <MenuItem value="weather">weather</MenuItem>
                  <MenuItem value="policy">policy</MenuItem>
                  {/* <MenuItem value="priceIndex">price index</MenuItem> */}
                 
                </Select>
            </div>
            <div className="row" style={{ margin: '1rem' }}>
              <input
                type="text"
                placeholder="newsfeed Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="row" style={{ margin: '1rem' }}>
              <textarea
                type="text"
                rows={5}
                cols={23}
                placeholder="Write the newsfeed detail here...."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              />
            </div>
            <div>
              <input
                accept="image/*"
                type="file"
                id="file"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                }}
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
            </div>
            <div style={{ margin: '2rem' }}>
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
                    'Add News Feed'
                  )}
                </Button>
              {success && <p>User added news successfully.</p>}
                {error && <p>{error}</p>}
            </div>
          </form>
        </div>
        <div style={{ backgroundColor: 'whitesmoke', margin: '1rem', width: '75%' }}>
        
          <h2> News Feed</h2>
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
               <MenuItem value="crop">Crop</MenuItem>
        <MenuItem value="tech">Technology</MenuItem>
        <MenuItem value="weather">Weather</MenuItem>
        <MenuItem value="policy">Policy</MenuItem>
        <MenuItem value="priceIndex">Price Index</MenuItem>
        </Select>
      </Box>

      {/* Search and Filter Buttons */}
      </div>
          {newsfeed.length === 0 ? (
            <p>non available.</p>
          ) : (
            <div>
              <ul>
                {newsfeed.map((newsfeed) => (
                  <Paper elevation={6} sx={{ margin: '1rem' }} key={newsfeed._id}>
                    <span style={{ marginRight: '1.5rem', color: 'red' }}>{newsfeed.catagory} "title": {newsfeed.title}</span>
                    <br />
                    <span style={{ marginRight: '0.5rem' }}>

                    {newsfeed.image && (
                        <img
                          src={`data:${newsfeed.image.contentType};base64,${newsfeed.image.data}`}
                          alt="news.."
                          width="25%" height="25%"
                          
                        />
                      )}

                    </span>
                    <br />
                    <span style={{ marginRight: '0.5rem' }}>{newsfeed.description}</span> <br />

                    <button className="btn btn-warning" style={{ margin: '1rem' }} onClick={() => handleEditNews(newsfeed._id)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" style={{ margin: '1rem' }} onClick={() => handleDeleteNews(newsfeed._id)}>
                      Delete
                    </button>
                  </Paper>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Paper>
      <MyFooter />
    </div>
  );
};

export default Newsfeed;
