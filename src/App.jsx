import React, { useState } from 'react';
import { ITEMS as initialItems } from './mockData';

const App = () => {
  const [balance, setBalance] = useState(450);
  const [items, setItems] = useState(initialItems);
  const [transactions, setTransactions] = useState([]);

  const handleTrade = (item) => {
    if (balance >= item.points) {
      setBalance(prev => prev - item.points);
      setItems(prevItems => prevItems.map(i => i.id === item.id ? { ...i, status: 'pending' } : i));
      setTransactions(prev => [{ name: item.name, points: item.points, time: new Date().toLocaleTimeString() }, ...prev]);
    }
  };

  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid #333', backgroundColor: '#1a1a1a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ backgroundColor: '#F76902', padding: '8px 12px', borderRadius: '8px', fontWeight: '900' }}>PAW</div>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>nShop</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '10px', color: '#888' }}>TIGER WALLET</div>
          <div style={{ color: '#F76902', fontWeight: 'bold', fontSize: '20px' }}>{balance} pts</div>
        </div>
      </nav>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3rem', margin: '0' }}>Campus Marketplace</h1>
          <p style={{ color: '#888' }}>Secure bartering powered by <span style={{ color: '#F76902' }}>Capital One Nessie API</span></p>
        </header>

        {/* --- THE GRID FIX (Using Flexbox for stability) --- */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
          {items.map((item) => (
            <div key={item.id} style={{ width: '300px', backgroundColor: '#1a1a1a', borderRadius: '24px', overflow: 'hidden', border: '1px solid #333' }}>
              <div style={{ height: '180px', backgroundColor: '#252525', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <span style={{ fontSize: '50px', opacity: 0.2 }}>📦</span>
                {item.status === 'pending' && (
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(247, 105, 2, 0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '10px' }}>
                    <span style={{ fontWeight: '900', fontSize: '18px' }}>LOCKED IN ESCROW</span>
                    <span style={{ fontSize: '10px', marginTop: '5px' }}>Verified by Nessie API</span>
                  </div>
                )}
              </div>
              
              <div style={{ padding: '24px' }}>
                <h3 style={{ margin: '0', fontSize: '18px' }}>{item.name}</h3>
                <div style={{ color: '#F76902', fontSize: '10px', fontWeight: 'bold', marginBottom: '20px' }}>{item.category.toUpperCase()}</div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #333', paddingTop: '15px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '900' }}>{item.points} 🐾</span>
                  <button 
                    onClick={() => handleTrade(item)}
                    disabled={item.status === 'pending'}
                    style={{ 
                      backgroundColor: item.status === 'pending' ? '#333' : 'white', 
                      color: item.status === 'pending' ? '#666' : 'black',
                      border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: item.status === 'pending' ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {item.status === 'pending' ? 'Pending' : 'Trade'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ledger Section */}
        <section style={{ marginTop: '80px', backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '24px', border: '1px solid #333' }}>
          <h2 style={{ color: '#F76902', fontStyle: 'italic', margin: '0 0 20px 0' }}>Nessie Ledger Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {transactions.length === 0 ? (
              <p style={{ color: '#555', fontStyle: 'italic' }}>Awaiting secure handshake transactions...</p>
            ) : (
              transactions.map((t, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: '#252525', borderRadius: '15px' }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{t.name}</div>
                    <div style={{ fontSize: '10px', color: '#888' }}>{t.time} • Escrow Success</div>
                  </div>
                  <div style={{ color: '#F76902', fontWeight: 'bold', fontFamily: 'monospace' }}>-{t.points} pts</div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;