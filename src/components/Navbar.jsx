import React from 'react';

const Navbar = ({ balance }) => {
  return (
    <nav className="bg-rit-black text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-rit-orange p-2 rounded-lg">
            <span className="text-2xl font-black italic">PAW</span>
          </div>
          <span className="text-2xl font-light tracking-tighter">nShop</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Tiger Wallet</p>
            <p className="text-xl font-mono text-rit-orange font-bold">{balance} <span className="text-sm text-white">pts</span></p>
          </div>
          <div className="h-10 w-10 rounded-full bg-rit-brown border-2 border-rit-orange flex items-center justify-center font-bold">
            AD
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;