import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BottomNav from './stickyNav';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
}

const CryptoDashboard: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 5,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchCoins();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchCoins, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Search Bar */}
      <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Cryptocurrency search, protocol"
          className="w-full max-w-md p-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring focus:ring-green-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Header Section */}
      <div className="mt-6 flex justify-center gap-4">
        <div className="bg-gray-800 p-4 rounded-md text-center">
          <h3 className="text-lg font-bold">Set up your wallet</h3>
          <p className="text-sm">
            Click Create and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-md text-center">
          <h3 className="text-lg font-bold">Create Your Collection</h3>
          <p className="text-sm">
            Click Create and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.
          </p>
        </div>
      </div>

      {/* Coins List */}
      <div className="mt-8">
        <div className="flex justify-center gap-4 text-gray-500 text-sm">
          <span>Stablecoin</span>
          <span>Single Cryptocurrency</span>
          <span>Vault</span>
        </div>
        <div className="mt-4">
          {filteredCoins.map((coin) => (
            <div
              key={coin.id}
              className="flex justify-between items-center bg-gray-800 p-4 mb-2 rounded-md"
            >
              <div className="flex items-center">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <h4 className="text-lg font-bold">{coin.name}</h4>
                  <p className="text-sm">${coin.market_cap.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <h4 className="text-lg font-bold">${coin.current_price.toFixed(2)}</h4>
                <p
                  className={`text-sm ${
                    coin.price_change_percentage_24h > 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
    <BottomNav/>
    </>
  );
};

export default CryptoDashboard;
