import React from 'react';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <div className="weather-card rounded-xl p-6 w-full max-w-md backdrop-blur-lg bg-gray-800/90">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
            alt={data.weather[0].description}
            className="w-24 h-24 invert"
          />
          <div>
            <div className="text-5xl font-bold text-gray-100">
              {Math.round(data.main.temp)}°C
            </div>
            <p className="text-lg text-gray-400 capitalize">{data.weather[0].description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 bg-gray-700/50 p-4 rounded-lg backdrop-blur-sm">
          <Thermometer className="w-6 h-6 text-blue-400" />
          <div>
            <p className="text-sm text-gray-400">Feels Like</p>
            <p className="text-lg font-semibold text-gray-200">{Math.round(data.main.feels_like)}°C</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gray-700/50 p-4 rounded-lg backdrop-blur-sm">
          <Droplets className="w-6 h-6 text-blue-400" />
          <div>
            <p className="text-sm text-gray-400">Humidity</p>
            <p className="text-lg font-semibold text-gray-200">{data.main.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gray-700/50 p-4 rounded-lg backdrop-blur-sm">
          <Wind className="w-6 h-6 text-blue-400" />
          <div>
            <p className="text-sm text-gray-400">Wind Speed</p>
            <p className="text-lg font-semibold text-gray-200">{Math.round(data.wind.speed)} km/h</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gray-700/50 p-4 rounded-lg backdrop-blur-sm">
          <Cloud className="w-6 h-6 text-blue-400" />
          <div>
            <p className="text-sm text-gray-400">Pressure</p>
            <p className="text-lg font-semibold text-gray-200">{data.main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
};