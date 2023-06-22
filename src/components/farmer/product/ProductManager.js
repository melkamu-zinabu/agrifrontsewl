
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Paper, Typography, Button, CircularProgress } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useNavigate } from 'react-router-dom';
import Footer from '../../landingPage/copyright';
import NavBar from '../FNavBar';
import { useSelector } from 'react-redux';
function ProductManagement() {
    const user = useSelector((state) => state.user);
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState();
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const[count,setcount]=useState(0)
    const[search,setsearch]=useState('')
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [profileData, setProfileData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  const handleAddProduct = async (e) => {
      e.preventDefault();
      setLoading(true); // Set loading state to true
  
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('quantity', quantity);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('id', user._id); // Include file in form data
  
        const response = await axios.post('http://localhost:3005/product/addproduct', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 201) {
          setSuccess(true);
          setError('');
          setName('');
          setDescription('');
          setQuantity('');
          setPrice('');
          setImage(null);
          setCategory('')
  
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
          setError('An error occurred during job addition.');
        }
      }
    };
    // `http://localhost:3005/product/getproductbyuserid?page=${page}&limit=10&id=${user._id}&search=${search}`
    useEffect(() => {
        fetchData(currentPage);
      }, [currentPage,search]);
    
    const fetchData = async (page) => {
        try {
          const response = await axios.get(`http://localhost:3005/product/getproductbyuserid?page=${page}&limit=3&id=${user._id}&search=${search}`);
          const { data, count } = response.data;
          setProfileData(data);
          setTotalPages(Math.ceil(count / 3));
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      const handleDelete = (id) => {
        axios
          .delete(`http://localhost:3005/product/deleteproduct/${id}`)
          .then((response) => {
            setProfileData(profileData.filter((farmer) => farmer._id !== id));
          })
          .catch((error) => {
            console.log(error);
          });
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
      <NavBar />
 
    <div >
    
      <Paper elevation={0} sx={{ display: { xs: 'block', sm: 'flex' }, fontSize: { xs: '10px', sm: '20px' }, marginTop: '3rem ' ,  }}>
        <Paper  sx={{ display: 'block', margin: '2rem auto', backgroundColor: 'whitesmoke', marginLeft:'2rem',maxHeight: '33rem', width:{sx:'80%',md:'25%'}  }}>
          <h2>Add Product</h2>
          <form onSubmit={handleAddProduct}>
        
           
            <div>
            <div className="row" style={{ margin: '1rem' }}>
          <input
            type="text"
            placeholder="crop name "
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="row" style={{ margin: '1rem' }}>
        <input
            type="text"
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="row" style={{ margin: '1rem' }}>
        <input
            type="number"
            placeholder="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseFloat(e.target.value))}
            className="form-control"
          />
        </div>
        <div className="row" style={{ margin: '1rem' }}>
        <input
            type="number"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="form-control"
          />
        </div>
        <div className="row" style={{ margin: '1rem' }}>
        <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
        </div>
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
            </div>
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
                    'Add product'
                  )}
                </Button>
                {success && <p>User registered successfully.</p>}
                {error && <p>{error}</p>}
          </form>
        </Paper>


        <Paper sx={{ backgroundColor: 'whitesmoke', margin: '2rem 1rem',marginBottom: '0', width: {xs:'100%',md:'75%' }}}>
          <h2>Product List</h2>

   
         <div style={{ display: 'flex', flexDirection: 'column',}}>
        <br />
        <br />
        <div style={{ padding: '-5px', marginBottom: 'auto' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ marginRight: '10px' }}>Search by title:</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              style={{ borderRadius: '5px', padding: '5px' }}
            />
          </div>
        </div>
      </div>
      
     
                           
      {profileData.length === 0 ? (<p>No product available.</p>) : (                
        <div>
         <ul>
                                {profileData.map((product) => (
                                    <Paper elevation={6} sx={{ margin: '1rem' }} key={product._id}>
                                        <span style={{ marginRight: '1.5rem', color: 'red' }}>Product name: {product.name}</span>
                                        <span style={{ marginLeft: '1.5rem', color: 'red' }}>Quantity: {product.quantity} Kuintel</span>
                                        <br />
                                        <span style={{ display: 'inline-flex', marginLeft: '2rem' }}>
                                            <img
                                                  src={`data:${product.image.contentType};base64,${product.image.data}`}
                                                width='600rem'
                                                height='120rem'
                                                style={{ borderRadius: '2rem' }}

                                            />
                                            <div>
                                                <span style={{ marginRight: '0.5rem' }}>{product.description}</span>
                                                <br />
                                                <span style={{ marginRight: '1.0rem', color: 'green' }}>Product Category: {product.category}</span>
                                                <span style={{ backgroundColor: 'whitesmoke' }}> Price: ETB{product.price}</span>
                                            </div>
                                        </span>
                                        <br />
                                        <button className='btn btn-warning' style={{ margin: '1rem' }} onClick={() => 'handleEditProduct(product._id)'}>Edit</button>
                                        <button className='btn btn-danger' style={{ margin: '1rem' }} onClick={() => handleDelete(product._id)}>
                                            Delete
                                        </button>
                                    </Paper>
                                ))}
                            </ul>
       
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button disabled={currentPage === 1} onClick={handlePreviousPage} style={{ marginRight: '10px' }}>
              <FaArrowLeft />
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button disabled={currentPage === totalPages} onClick={handleNextPage} style={{ marginLeft: '10px' }}>
              <FaArrowRight />
            </button>
          </div>
    </div>)} 

      </Paper>

        {/* <Paper sx={{ backgroundColor: 'whitesmoke', margin: '2rem 1rem',marginBottom: '0', width: {xs:'100%',md:'75%' }}}>
          <h2>DA Worker List</h2>

   
         <div style={{ display: 'flex', flexDirection: 'column',}}>
        <br />
        <br />
        <div style={{ padding: '-5px', marginBottom: 'auto' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ marginRight: '10px' }}>Search by title:</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              style={{ borderRadius: '5px', padding: '5px' }}
            />
          </div>
        </div>
      </div>








          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <br />
        <br />
        <div style={{ padding: '-5px', marginBottom: 'auto' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ marginRight: '10px' }}>Search by name:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchTermChange}
              style={{ borderRadius: '5px', padding: '5px' }}
            />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Profile Image</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFarmers.map((farmer) => (
                  <tr key={farmer._id} style={{ borderBottom: '1px solid #ccc' }}>
                    <td style={tdStyle}>{farmer.name}</td>
                    <td style={tdStyle}>{farmer.email}</td>
                    <td style={tdStyle}>
                      {farmer.image && (
                        <img
                          src={`data:${farmer.image.contentType};base64,${farmer.image.data}`}
                          alt="Profile"
                          width="38px"
                          height="38px"
                          style={{ padding: 0 }}
                        />
                      )}
                    </td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => handleDelete(farmer._id)}
                        style={{
                          backgroundColor: '#dc3545',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '5px',
                          padding: '5px 10px',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
     
      </div>
        </Paper> */}

      </Paper>
     
    </div>
      <Footer style={{ marginTop: 'auto' }} />
    </>
  );
}

export default ProductManagement;





