// App.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CityForm from './components/CityForm';
import Header from './components/Header';
import Map from './components/Map';
import Footer from './components/Footer';
import Error from './components/ErrorMessage';
import Weather from './components/Weather';

const API_KEY = import.meta.env.VITE_API_KEY;
const SERVER = import.meta.env.VITE_SERVER_SIDE;

function App() {
  const [location, setLocation] = useState({
    city: '',
    latitude: null,
    longitude: null,
  });
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.latitude !== null && location.longitude !== null) {
      grabWeatherData(location.latitude, location.longitude);
    }
  }, [location]);

  async function grabCityData(cityName) {
    let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${cityName}&format=json`;
    try {
      let response = await axios.get(url);
      setLocation({
        city: response.data[0].display_name,
        latitude: response.data[0].lat,
        longitude: response.data[0].lon,
      });
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  }

  async function grabWeatherData(latitude, longitude) {
    try {
      let response = await axios.get(SERVER, { params: { latitude, longitude } });
      const { CityName, forecast } = response.data;
      console.log("CityName:", CityName);
      console.log("forecast:", forecast);
      setWeatherData(forecast);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <Header />
      <CityForm grabCityData={grabCityData} />
      <Map selectedCity={location.city} latitude={location.latitude} longitude={location.longitude} />
      <Weather weather={weatherData} selectedCity={location.city} />
      <Error show={error !== ''} errorMessage={error} />
      <Footer />
    </>
  );
}

export default App;
