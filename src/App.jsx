import './app.css'
import React, { useState } from 'react';
import { ITEMS as initialItems } from './mockData';
import MarketplaceGrid from './components/MarketplaceGrid';
import Navbar from './components/Navbar';

function App() {
  const [balance, setBalance] = useState(450); // Initial Paw-Points
  const [items, setItems] = useState(initialItems);

  const handleTrade = (itemId, price) => {
    if (balance >= price) {
      // 1. Subtract balance (Simulation of Escrow Lock)
      setBalance(prev => prev - price);
      
      // 2. Update item status to 'pending'
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId ? { ...item, status: 'pending' } : item
        )
      );
      
      alert("Trade Request Sent! Funds are held in escrow until you meet.");
    } else {
      alert("Insufficient Paw-Points!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar balance={balance} />
      <main className="p-8 max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-rit-black">Campus Marketplace</h2>
          <p className="text-gray-600 mt-2">Securely barter gear with fellow Tigers.</p>
        </header>

        <MarketplaceGrid items={items} onTrade={handleTrade} />
      </main>
    </div>
  );
}

export default App;