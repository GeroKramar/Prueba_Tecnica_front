import React from 'react';

const Portal: React.FC = () => {
  return (
    <div className="relative w-72 h-72">
      <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-green-500 to-green-300 animate-spin-slow"></div>
      <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-green-600 to-green-400 animate-pulse opacity-75"></div>
    </div>
  );
};

export default Portal;
