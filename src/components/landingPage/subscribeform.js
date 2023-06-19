import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
const SubscribeForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any validation or submit logic here
    // You can make an API request to save the phone number to the backend
    axios
      .post('http://localhost:3005/contact/addphone', { phoneNumber })
      .then((response) => {
        console.log('Phone number saved successfully');
      })
      .catch((error) => {
        console.error('Error saving phone number:', error);
      });

    // Reset the form
    setPhoneNumber('');
    
  };
  return (
    <div className="subscribe">
      <h6 className="text-uppercase fw-bold">Subscribe</h6>
      <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }} />
    
      <form onSubmit={handleSubmit}>
        <div  className="form-group">
        <label>
    Phone Number:
    <PhoneInput
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
      value={phoneNumber}
      onChange={setPhoneNumber}
    />
  </label>
  <br />
  <button type="submit" className="btn btn-primary mt-3">Submit</button>
   
        </div>
      </form>





     
    </div>
  );
};

export default SubscribeForm;