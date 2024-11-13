import React from 'react';
import { ForecastData } from '../types/weather';

interface ForecastCardProps {
  data: ForecastData;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ data }) => {
  const dailyForecast = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);

  return (
    <div className="weather-card rounded-xl p-6 w-full max-w-md mt-4">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-5 gap-4">
        {dailyForecast.map((day, index) => (
          <div key={index} className="text-center">
            <p className="text-sm text-gray-400">
              {new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].main}
              className="w-12 h-12 mx-auto invert"
            />
            <p className="font-semibold text-gray-200">{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};