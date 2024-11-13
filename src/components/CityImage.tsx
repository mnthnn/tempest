import React from 'react';

interface CityImageProps {
  city: string;
}

export const CityImage: React.FC<CityImageProps> = ({ city }) => {
  const imageUrl = `https://source.unsplash.com/1600x900/?${city},cityscape`;

  return (
    <div className="relative w-full h-64 mb-8 overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90 z-10" />
      <img
        src={imageUrl}
        alt={`${city} cityscape`}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute bottom-0 left-0 p-6 z-20">
        <h2 className="text-4xl font-bold text-white mb-2">{city}</h2>
        <p className="text-gray-200 text-sm">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
    </div>
  );
};