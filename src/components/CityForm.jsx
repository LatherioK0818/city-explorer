import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CityForm = (props) => {
  const [cityName, setCityName] = useState('Amman');
  const [locationData, setLocationData] = useState(null);
  const [showHeading, setShowHeading] = useState(false);

  const handleChange = (e) => {
    setShowHeading(false);
    setCityName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowHeading(true);

    props.handleChangeCity(cityName);
    setLocationData(cityName);
  }

  return (
    <div className="location-container">
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
            <strong>City:</strong> {props.city}
          </p>
          <p>
            <strong>Latitude:</strong> {props.latitude}
          </p>
          <p>
            <strong>Longitude:</strong> {props.longitude}
          </p>
        </div>
      )}
    </div>
  );
};

export default CityForm;