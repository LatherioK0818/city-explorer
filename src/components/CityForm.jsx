import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const CityForm = (props) => {
  const [cityName, setCityName] = useState('');
  const [locationData, setLocationData] = useState(null);
  const [showHeading, setShowHeading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleChange = (e) => {
    setShowHeading(false);
    setCityName(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowHeading(true);

    try {
      const response = await axios.get(`Y?city=${cityName}&apiKey=${API_KEY}`);

      const firstResult = response.data[0];

      if (firstResult) {
        const { display_name, lat, lon } = firstResult;
        setLocationData({ displayName: display_name, latitude: lat, longitude: lon });
      } else {
        console.error('No results found for', cityName);
      }
    } catch (error) {
      console.error('Error fetching location data:', error.message);
    }
  }

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cityName" className="form-label">
            City Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="cityName"
            value={cityName}
            onChange={handleChange}
            placeholder="Enter city name"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Explore!
        </button>
      </form>

      {showHeading && locationData && (
        <div className="mt-3">
          <h2>Location Data</h2>
          <p>
            <strong>City:</strong> {locationData.displayName}
          </p>
          <p>
            <strong>Latitude:</strong> {locationData.latitude}
          </p>
          <p>
            <strong>Longitude:</strong> {locationData.longitude}
          </p>
        </div>
      )}
    </div>
  );
};

export default CityForm;
