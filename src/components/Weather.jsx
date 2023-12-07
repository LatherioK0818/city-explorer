import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const Weather = (props) => {
  const [showWeather, setShowWeather] = useState(null);

  const getWeather = () => {
    setShowWeather(true);
  }

  return (
    <div>
      <h2>Weather Forecast for {props.city}</h2>
      {props.weatherData.length === 0 ? (
        <p>No forecast data available</p>
      ) : (
        <div>
          {showWeather ?
            <ul>
              {props.weatherData.map((forecast, index) => (
                <li key={index}>
                  <strong>Date:</strong> {forecast.date} &nbsp; - &nbsp; 
                  <strong>Description:</strong> {forecast.description}
                </li>
              ))}
            </ul>
            : null
          }

          <Button onClick={getWeather}>
            Get Weather
          </Button>
        </div>
      )}
    </div>
  );
};

export default Weather;