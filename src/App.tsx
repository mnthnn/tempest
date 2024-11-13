import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CloudSun } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { SearchBar } from './components/SearchBar';
import { CityImage } from './components/CityImage';
import { AirQualityCard } from './components/AirQualityCard';
import { WeatherData, ForecastData, AirQualityData } from './types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeatherData = async (city: string) => {
    try {
      setLoading(true);
      setError('');

      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`),
        axios.get(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`)
      ]);

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);

      // Fetch air quality data using coordinates
      const { lat, lon } = weatherResponse.data.coord;
      const airQualityResponse = await axios.get(
        `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      setAirQuality(airQualityResponse.data);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
      setForecast(null);
      setAirQuality(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData('London');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <CloudSun className="w-12 h-12 text-blue-400" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Tempest
              </h1>
              <p className="text-gray-400 text-sm">Your weather-buddy</p>
            </div>
          </div>
          <SearchBar onSearch={fetchWeatherData} />
        </header>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400" />
          </div>
        )}

        {error && (
          <div className="text-red-400 text-center py-4 mb-4 bg-red-400/10 rounded-lg">
            {error}
          </div>
        )}

        {weather && (
          <>
            <CityImage city={weather.name} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <WeatherCard data={weather} />
                {airQuality && <AirQualityCard data={airQuality} />}
              </div>
              {forecast && <ForecastCard data={forecast} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;