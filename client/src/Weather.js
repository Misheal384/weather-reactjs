import React, { useState } from 'react';
import axios from 'axios';
import { FaThermometerHalf } from 'react-icons/fa';
import { WiDaySunny } from 'react-icons/wi';
import { FaTint } from 'react-icons/fa';
import { FaWind } from 'react-icons/fa';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`, {
       
      });
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('Could not fetch weather data');
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
        <h1>Weather App</h1>
      <div className="weather-header">
        
        <div className="input-container">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button onClick={fetchWeather}>Get Weather</button>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="weather-details">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <div className="weather-stats">
            <div className="stat">
              <FaThermometerHalf size={32} />
              <p>
                <strong>Temperature:</strong> {weather.main.temp}°C
              </p>
            </div>
            <div className="stat">
              <WiDaySunny size={32} />
              <p>
                <strong>Weather:</strong> {weather.weather[0].description}
              </p>
            </div>
            <div className="stat">
              <FaTint size={32} />
              <p>
                <strong>Humidity:</strong> {weather.main.humidity}%
              </p>
            </div>
            <div className="stat">
              <FaWind size={32} />
              <p>
                <strong>Wind Speed:</strong> {weather.wind.speed} m/s
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;