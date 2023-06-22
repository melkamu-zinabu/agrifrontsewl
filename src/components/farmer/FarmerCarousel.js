import React from 'react';
import './FarmerCarousel.css'; // Import CSS file for styling

const ImageWithOverlay = () => {
  return (
    <div className="image-container">
      <img src="path/to/your/image.jpg" alt="Image" className="image" />
      <div className="overlay">
        <h2 className="overlay-text">Hello, World!</h2>
      </div>
    </div>
  );
};

export default ImageWithOverlay;
