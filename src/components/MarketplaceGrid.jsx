import React from 'react';

const MarketplaceGrid = ({ items, onTrade }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 transition-all hover:shadow-2xl">
          <div className="relative h-56 bg-gray-200 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-400 opacity-50">{item.name.split(' ')[0]}</span>
            {item.status === 'pending' && (
              <div className="absolute inset-0 bg-rit-black/60 flex items-center justify-center">
                <span className="text-white font-bold text-xl uppercase tracking-widest border-2 border-white p-2">Pending Meetup</span>
              </div>
            )}
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-rit-black leading-tight">{item.name}</h3>
              <span className="text-xs font-bold uppercase px-2 py-1 bg-gray-100 rounded text-gray-500">{item.category}</span>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-2xl font-black text-rit-orange">{item.points} 🐾</p>
              </div>
              
              <button 
                onClick={() => onTrade(item.id, item.points)}
                disabled={item.status === 'pending'}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  item.status === 'pending' 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-rit-black text-white hover:bg-rit-orange hover:scale-105 active:scale-95'
                }`}
              >
                {item.status === 'pending' ? 'Locked' : 'Request Trade'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketplaceGrid;