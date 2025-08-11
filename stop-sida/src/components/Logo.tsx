import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <img
        src="/icons/stop_sida_log.png"
        alt="Logo Stop Sida"
        className="w-full h-full object-contain rounded-full shadow-xl hover:shadow-2xl transition-shadow duration-300"
      />
    </div>
  );
};

export default Logo;