import React, { useState } from 'react';
import axios from 'axios';
import CityForm from './components/CityForm';
import Header from './components/Header';
import Map from './components/Map';
import Footer from './components/Footer';
import Error from './components/ErrorMessage';
import Weather from './components/Weather';
import Movies from './components/Movies';
import './App.css';

const API_KEY = import.meta.env.VITE_API_KEY;
const SERVER = import.meta.env.VITE_SERVER_SIDE;
const BASE_URL = `https://us1.locationiq.com/v1/search?key=${API_KEY}`
const MOVIE_API_KEY = import.meta.env.MOVIE_API_KEY;

function App() {
  // =========================== DECLARE STATE VARS
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(40.7127281);
  const [longitude, setLongitude] = useState(-74.0060152);
  const [error, setError] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [isWeatherData, setIsWeatherData] = useState(false);
  const [movies, setMovies] = useState([]);

  async function grabCityData(cityName) {
    let url = `${BASE_URL}&q=${cityName}&format=json`;

    try {
      let res = await axios.get(url);
      setCity(res.data[0].display_name);
      setLatitude(res.data[0].lat);
      setLongitude(res.data[0].lon);
      grabWeatherData(res.data[0].lat, res.data[0].lon, cityName);
      grabMovieData(res.data[0].display_name);

    } catch (err) {
      console.error(err.message);
      setError(`${err.code}: ${err.message}. Check your input and try again.`);
    }

  }

  async function grabWeatherData(lat, lon, city) {
    let query = `${SERVER}/weather?lat=${lat}&lon=${lon}&q=${city}`;

    try {
      let res = await axios.get(query);

      console.log(res.data);
      let loc_api_data = res.data;

      let weather = loc_api_data.data.map(d => {

        let dObject = {
          date : d.datetime,
          description : d.weather.description,
          temp : d.weather.temp
        }

        return dObject;
      })

      console.log(loc_api_data);

      setWeatherData(weather);
      setIsWeatherData(true);

    } catch (err) {
      console.error(err);
      setError(`${err.code}: ${err.message}.`);
    }
  }
async function grabMovieData(cityName) {
  try {
    let response = await axios.get(SERVER_MOVIES, { params: { "city": cityName } });
    let movieData = response.data;

    // Process the movie data as needed
    // For example, if your movie API response has a 'movies' property, you can extract it like this:
    let movies = movieData.movies.map(movie => ({
      title: movie.title,
      // Add other properties you need
    }));

    // Set the movies state
    setMovies(movies);

    console.log(movies);
  } catch (err) {
    console.error(err);
    setError(`${err.code}: ${err.message}.`);
  }
}
  // =========================== CHANGE CITY FUNCTION
  function changeCity(newCity) {
    grabCityData(newCity);
  }

  return (
    <>
      <Header />

      <CityForm
        grabCityData={grabCityData}
        city={city}
        handleChangeCity={changeCity}
        latitude={latitude}
        longitude={longitude}
      />

      <Map latitude={latitude} longitude={longitude} />

      {
        isWeatherData
          ? <Weather weatherData={weatherData} city={city} />
          : null
      }
      {error ? <Error show={error} errorMessage={error.message} /> : null}
      {movies.map > 0 ? <Movies movies={movies} /> : null}
      <Footer />
    </>
  );
}

export default App;