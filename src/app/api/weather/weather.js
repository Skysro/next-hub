import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '7c91c96023d246d5bdf154500241807'

  const fetchData = async () => {
    setIsLoading(true);
    setError(null); 

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchData();
    }
  }, [city]); 

  if (isLoading) {
    return <p>Loading weather data...</p>;
  }

  if (error) {
    return <p>Error fetching weather: {error}</p>;
  }

  if (!weatherData) {
    return null; 
  }
console.log(weatherData);
 
  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>Condition: {weatherData.current.condition.text}</p>
      <p>Temperature: {weatherData.current.temp_c}°C</p>
      <p>Feels like: {weatherData.current.feelslike_c}°C</p>
    </div>
  );
};

export default Weather;