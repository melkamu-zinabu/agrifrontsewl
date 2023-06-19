import React, { useState } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const PhoneNumberForm = () => {
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
    <form onSubmit={handleSubmit}>
      <label>
        Phone Number:
        <PhoneInput
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={setPhoneNumber}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PhoneNumberForm;
