import React, { useState } from 'react';
import { ITEMS as initialItems } from './mockData';

const App = () => {
  const [balance, setBalance] = useState(450);
  const [items, setItems] = useState(initialItems);
  const [transactions, setTransactions] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleTrade = (item) => {
    if (balance >= item.points) {
      setBalance(prev => prev - item.points);
      setItems(prevItems => prevItems.map(i => i.id === item.id ? { ...i, status: 'pending' } : i));
      setTransactions(prev => [{ name: item.name, points: item.points, time: new Date().toLocaleTimeString() }, ...prev]);
      
      const transactionId = Math.random().toString(36).substring(2, 10).toUpperCase();
      setSelectedItem(item.name);
      setShowMap(true);
      console.log(`Nessie API: Transaction #${transactionId} verified.`);
    } else {
      alert("Insufficient Paw-Points!");
    }
  };

  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 40px', borderBottom: '1px solid #333', backgroundColor: '#1a1a1a', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#F76902', fontStyle: 'italic' }}>PAW</div>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>nShop</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '10px', color: '#888', fontWeight: 'bold' }}>TIGER WALLET</div>
          <div style={{ color: '#F76902', fontWeight: 'bold', fontSize: '20px' }}>{balance} pts</div>
        </div>
      </nav>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3.5rem', margin: '0', fontWeight: '900' }}>Campus Marketplace</h1>
          <p style={{ color: '#888', fontSize: '1.1rem' }}>Secure bartering powered by <span style={{ color: '#F76902', fontWeight: 'bold' }}>Capital One Nessie API</span></p>
        </header>

        {/* Marketplace Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
          {items.map((item) => (
            <div key={item.id} style={{ width: '320px', backgroundColor: '#1a1a1a', borderRadius: '28px', overflow: 'hidden', border: '1px solid #333', transition: '0.3s' }}>
              {/* Image Container with Fallback */}
              <div style={{ height: '200px', backgroundColor: '#252525', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ width: '100%', height: '100%', objectCover: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span style={{ position: 'absolute', fontSize: '50px', opacity: 0.15, zIndex: 0 }}>📦</span>
                
                {item.status === 'pending' && (
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(247, 105, 2, 0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px', backdropFilter: 'blur(4px)', zIndex: 10 }}>
                    <span style={{ fontWeight: '900', fontSize: '18px', color: 'white' }}>LOCKED IN ESCROW</span>
                    <span style={{ fontSize: '10px', marginTop: '5px', color: 'white', fontWeight: 'bold' }}>Verified by Nessie API</span>
                  </div>
                )}
              </div>
              
              <div style={{ padding: '24px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ margin: '0', fontSize: '20px', fontWeight: 'bold' }}>{item.name}</h3>
                  <div style={{ color: '#F76902', fontSize: '11px', fontWeight: 'bold', marginTop: '5px', letterSpacing: '1px' }}>{item.category.toUpperCase()}</div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #333', paddingTop: '20px' }}>
                  <span style={{ fontSize: '22px', fontWeight: '900' }}>{item.points} 🐾</span>
                  <button 
                    onClick={() => handleTrade(item)}
                    disabled={item.status === 'pending'}
                    style={{ 
                      backgroundColor: item.status === 'pending' ? '#333' : 'white', 
                      color: item.status === 'pending' ? '#666' : 'black',
                      border: 'none', padding: '12px 24px', borderRadius: '14px', fontWeight: 'bold', cursor: item.status === 'pending' ? 'not-allowed' : 'pointer', fontSize: '14px'
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
        <section style={{ marginTop: '80px', backgroundColor: '#1a1a1a', padding: '40px', borderRadius: '32px', border: '1px solid #333' }}>
          <h2 style={{ color: '#F76902', fontStyle: 'italic', margin: '0 0 30px 0', fontSize: '24px' }}>Nessie Ledger Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {transactions.length === 0 ? (
              <p style={{ color: '#555', fontStyle: 'italic' }}>Awaiting secure handshake transactions...</p>
            ) : (
              transactions.map((t, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#252525', borderRadius: '18px', border: '1px solid #333' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{t.name}</div>
                    <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>{t.time} • Escrow Success • Capital One Verified</div>
                  </div>
                  <div style={{ color: '#F76902', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '18px' }}>-{t.points} pts</div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Safety Map Modal */}
      {showMap && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: 'white', color: 'black', padding: '40px', borderRadius: '32px', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '10px' }}>📍 Secure Meetup</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>Your request for <strong>{selectedItem}</strong> is locked. Meet at the <strong>SHED (Level 1)</strong> to complete the trade.</p>
            <div style={{ height: '150px', backgroundColor: '#eee', borderRadius: '20px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#F76902', border: '2px dashed #F76902' }}>
              RIT SAFETY ZONE: THE SHED
            </div>
            <button 
              onClick={() => setShowMap(false)}
              style={{ width: '100%', backgroundColor: '#F76902', color: 'white', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
            >
              I'm on my way!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;