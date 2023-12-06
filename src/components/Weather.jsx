import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const SERVER = import.meta.env.VITE_SERVER_SIDE;

const Weather = ({ weather, selectedCity }) => {
  const [weatherData, setWeatherData] = useState([]);

  async function getWeather() {
    try {
      const response = await axios.get(SERVER);
      setWeatherData(response.data.weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
    }
  }

  useEffect(() => {
    setWeatherData(weather);
  }, [weather]);

  return (
    <div>
      <h2>Weather Forecast for {selectedCity}</h2>
      {weatherData.length === 0 ? (
        <p>No forecast data available</p>
      ) : (
        <div>
          <ul>
            {weatherData.map((forecast, index) => (
              <li key={index}>
                <strong>Date:</strong> {forecast.date}, <strong>Description:</strong> {forecast.description}
              </li>
            ))}
          </ul>
          <Button onClick={getWeather}>
            Get Weather
          </Button>
        </div>
      )}
    </div>
  );
};

export default Weather;

