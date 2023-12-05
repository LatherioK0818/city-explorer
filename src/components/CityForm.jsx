import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const CityForm = () => {
  const [cityName, setCityName] = useState('');
  const [locationData, setLocationData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=VITE_API_KEY&q=${cityName}&format=json`
      );

      const { display_name, lat, lon } = response.data[0];

      setLocationData({ displayName: display_name, latitude: lat, longitude: lon });
    } catch (error) {
      console.error('Error fetching location data:', error.message);
    }
  };

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
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Explore!
        </button>
      </form>

      {locationData && (
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