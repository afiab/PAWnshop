import React from 'react';

const SafetyMap = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-rit-black/80">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-rit-black">📍 Recommended Meetup</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-rit-orange text-2xl">×</button>
        </div>
        
        {/* Simple Map Representation */}
        <div className="bg-gray-200 rounded-xl h-48 flex flex-col items-center justify-center border-2 border-dashed border-rit-orange mb-4">
          <p className="font-bold text-rit-black">The SHED - Level 1 Lobby</p>
          <p className="text-sm text-gray-600">Monitored Safety Zone</p>
        </div>

        <p className="text-gray-700 text-sm mb-6">
          For your security, meet in high-traffic areas. Your 🐾 Paw-Points are being held safely until you both confirm the exchange.
        </p>

        <button 
          onClick={onClose}
          className="w-full bg-rit-orange text-white py-3 rounded-xl font-bold hover:bg-rit-black transition-colors"
        >
          Got it, I'm on my way!
        </button>
      </div>
    </div>
  );
};

export default SafetyMap;