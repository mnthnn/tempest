import React from 'react';
import { Wind } from 'lucide-react';
import { AirQualityData } from '../types/weather';

interface AirQualityCardProps {
  data: AirQualityData;
}

export const AirQualityCard: React.FC<AirQualityCardProps> = ({ data }) => {
  const getAQILevel = (aqi: number) => {
    const levels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    const colors = ['text-green-400', 'text-blue-400', 'text-yellow-400', 'text-orange-400', 'text-red-400'];
    return {
      level: levels[aqi - 1],
      color: colors[aqi - 1]
    };
  };

  const aqi = data.list[0].main.aqi;
  const { level, color } = getAQILevel(aqi);

  return (
    <div className="weather-card rounded-xl p-6 w-full max-w-md mt-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Wind className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-gray-100">Air Quality</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
          {level}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">PM2.5</p>
          <p className="text-lg font-semibold text-gray-200">
            {Math.round(data.list[0].components.pm2_5)} µg/m³
          </p>
        </div>
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">PM10</p>
          <p className="text-lg font-semibold text-gray-200">
            {Math.round(data.list[0].components.pm10)} µg/m³
          </p>
        </div>
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">O₃</p>
          <p className="text-lg font-semibold text-gray-200">
            {Math.round(data.list[0].components.o3)} µg/m³
          </p>
        </div>
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">NO₂</p>
          <p className="text-lg font-semibold text-gray-200">
            {Math.round(data.list[0].components.no2)} µg/m³
          </p>
        </div>
      </div>
    </div>
  );
};