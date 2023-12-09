import React, { useState } from 'react';

function Weather (props)  {
  const [showWeather, setShowWeather] = useState(false);

  const getWeather = () => {
    setShowWeather(true);
  }

  console.log(typeof props.weatherData);  // Add your console.log message inside the parentheses

  return (
      <div class="weather-container">
        {console.log(props.weatherData)}
      {props.weatherData.length > 0 ? props.weatherData.map((forecast, index) => (
      <div key={index}>
        <h2>Weather Forecast</h2>
        <p><strong>Date:</strong> {forecast.date} </p>
        <p><strong>Description:</strong> {forecast.description}</p>
        <p><strong>Low Temp:</strong> {forecast.lowTemp}</p>
        <p><strong>High Temp:</strong> {forecast.highTemp}</p>
        </div>
       )):<p> "Data Not Found"</p>}
      </div>
  );
};

export default Weather;


