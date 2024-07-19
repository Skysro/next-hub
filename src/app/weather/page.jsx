'use client'

import Weather from '../api/weather/weather'
import React, { useState } from 'react'
import { FaSun, FaCloud, FaCloudRain, FaSnowflake } from 'react-icons/fa'; // Import icons from react-icons

const Mypage = () => {
  const [city, setCity] = useState('Bhubaneswar');
  const [submittedCity, setSubmittedCity] = useState(''); // Initialize as empty string

  // Example condition function to determine the weather icon
  const getWeatherIcon = (city) => {
    const iconStyle = { fontSize: '5rem', margin: '20px' }; // Increase size and add margin
    switch (city.toLowerCase()) {
      case 'london':
        return <FaCloud style={{ ...iconStyle, color: 'gray' }} />;
      case 'miami':
        return <FaSun style={{ ...iconStyle, color: 'orange' }} />;
      case 'seattle':
        return <FaCloudRain style={{ ...iconStyle, color: 'blue' }} />;
      case 'moscow':
        return <FaSnowflake style={{ ...iconStyle, color: 'lightblue' }} />;
      default:
        return <FaCloud style={{ ...iconStyle, color: 'gray' }} />;
    }
  };

  const handleSubmit = () => {
    setSubmittedCity(city); // Update submitted city on button click
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}> {/* Center content and add padding */}
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city" 
        style={{ 
          fontSize: '1.2rem', 
          padding: '10px', 
          margin: '20px 0', 
          borderRadius: '5px', 
          border: '1px solid #ccc', 
          width: '50%' 
        }} // Style input
      />
      <button 
        onClick={handleSubmit} 
        style={{ 
          fontSize: '1.2rem', 
          padding: '10px 20px', 
          margin: '10px', 
          borderRadius: '5px', 
          border: 'none', 
          backgroundColor: '#007BFF', 
          color: 'white', 
          cursor: 'pointer' 
        }}
      >
        Submit
      </button> {/* Add submit button */}
      {submittedCity && ( // Conditionally render based on submittedCity
        <>
          {getWeatherIcon(submittedCity)} {/* Display icon based on submitted city */}
          <Weather city={submittedCity} /> {/* Pass submitted city to Weather component */}
        </>
      )}
    </div>
  )
}

export default Mypage