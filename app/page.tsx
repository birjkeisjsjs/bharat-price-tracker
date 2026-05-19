'use client';
import { useState } from 'react';
import { MapPin, Search, TrendingUp, TrendingDown } from 'lucide-react';

export default function Home() {
  const [pin, setPin] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [location, setLocation] = useState('');

  const fetchPrices = () => {
    if (pin.length === 6) {
      setLocation('Delhi');
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">₹</div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Bharat Prices</h1>
              <p className="text-xs text-gray-500 -mt-1">Aaj ke mol</p>
            </div>
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live Prices
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {!showResults ? (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-6 shadow">
              <span className="text-green-600">📍</span>
              <span className="text-sm font-medium">Prices near you</span>
            </div>

            <h2 className="text-6xl font-bold text-gray-900 leading-tight mb-6">
              Today's Real Prices<br />For Your Area
            </h2>
            <p className="text-2xl text-gray-600 mb-12 max-w-md mx-auto">
              Fuel • Vegetables • Groceries • LPG • Essentials
            </p>

            <div className="bg-white rounded-3xl shadow-2xl p-2 max-w-md mx-auto">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter 6 digit PIN Code"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="flex-1 px-8 py-7 text-2xl outline-none rounded-l-3xl"
                  maxLength={6}
                />
                <button
                  onClick={fetchPrices}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 rounded-r-3xl font-semibold flex items-center gap-3 text-lg"
                >
                  <Search className="w-6 h-6" /> Show Prices
                </button>
              </div>
            </div>

            <button className="mt-8 text-green-600 hover:text-green-700 flex items-center gap-2 mx-auto text-lg font-medium">
              <MapPin className="w-5 h-5" /> Use my current location
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-gray-500">Showing prices for</p>
                <div className="flex items-center gap-3">
                  <MapPin className="text-orange-500" />
                  <h3 className="text-4xl font-semibold">{location}, India</h3>
                </div>
              </div>
              <button onClick={() => setShowResults(false)} className="text-green-600 underline">Change PIN</button>
            </div>

            {/* Fuel Section */}
            <section className="mb-16">
              <h3 className="text-3xl font-semibold mb-8 flex items-center gap-3">⛽ Fuel Prices</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {name: 'Petrol', price: '94.72', change: '-1.8', unit: '₹/Litre'},
                  {name: 'Diesel', price: '87.45', change: '+0.4', unit: '₹/Litre'},
                  {name: 'CNG', price: '76.50', change: '-0.9', unit: '₹/Kg'},
                  {name: 'LPG', price: '903', change: '0', unit: '₹/Cylinder'},
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-3xl p-8 shadow hover:shadow-xl transition-all">
                    <p className="text-gray-500 text-lg">{item.name}</p>
                    <div className="text-6xl font-bold my-4">₹{item.price}</div>
                    <div className={`inline-flex items-center gap-1.5 text-lg ${item.change.startsWith('-') ? 'text-green-600' : 'text-red-500'}`}>
                      {item.change.startsWith('-') ? <TrendingDown /> : <TrendingUp />}
                      {item.change} today
                    </div>
                    <p className="text-sm text-gray-400 mt-6">{item.unit}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="text-center text-sm text-gray-500">
              Last updated: Just now • Data from official sources
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
