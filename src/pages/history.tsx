import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BottomNav from './stickyNav';

interface Transaction {
  id: number;
  coin: string;
  amount: string;
  time: string;
  type: 'deposit' | 'withdrawal';
  price: string;
  status: 'success' | 'pending' | 'failed';
  image: string; // Added image property
}

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
}

const WalletPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'history' | 'market'>('history');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    // Fetch transaction history (mocked here for demonstration)
    const fetchTransactions = () => {
      setTransactions([
        {
          id: 1,
          coin: 'Bitcoin',
          amount: '0.0056',
          time: '11:34 AM',
          type: 'deposit',
          price: '$950.50',
          status: 'success',
          image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        },
        {
          id: 2,
          coin: 'Ethereum',
          amount: '1.498',
          time: '12:00 AM',
          type: 'deposit',
          price: '$12948.68',
          status: 'success',
          image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
        },
        {
          id: 3,
          coin: 'Tether',
          amount: '-2700.00',
          time: '1:12 PM',
          type: 'withdrawal',
          price: '-$2700.00',
          status: 'success',
          image: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
        },
        {
          id: 4,
          coin: 'Dogecoin',
          amount: '1050',
          time: '2:45 PM',
          type: 'deposit',
          price: '$105.50',
          status: 'pending',
          image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
        },
        {
          id: 5,
          coin: 'Ripple',
          amount: '20',
          time: '3:20 PM',
          type: 'withdrawal',
          price: '-$30.00',
          status: 'failed',
          image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
        },
      ]);
    };

    // Fetch live market data
    const fetchMarketData = async () => {
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
        console.error("Error fetching market data:", error);
      }
    };

    fetchTransactions();
    fetchMarketData();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-THIN">Crypto Wallet</h1>
          <span className="text-gray-400">Balance: $890,530.30</span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            className={`flex-1 p-3 text-center ${activeTab === 'history' ? 'bg-gray-800 text-green-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
          <button
            className={`flex-1 p-3 text-center ${activeTab === 'market' ? 'bg-gray-800 text-green-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('market')}
          >
            Market
          </button>
        </div>

        {/* Content */}
        {activeTab === 'history' ? (
          <div className="mt-6">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center bg-gray-800 p-4 rounded-md mb-2">
                <div className="flex items-center">
                  <img
                    src={transaction.image}
                    alt={transaction.coin}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{transaction.coin}</h3>
                    <p className="text-sm text-gray-400">{transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {transaction.type === 'deposit' ? '+' : '-'} {transaction.amount}
                  </p>
                  <p className="text-sm text-gray-400">{transaction.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6">
            {coins.map((coin) => (
              <div
                key={coin.id}
                className="flex justify-between items-center bg-gray-800 p-4 rounded-md mb-2"
              >
                <div className="flex items-center">
                  <img src={coin.image} alt={coin.name} className="w-10 h-10 mr-4" />
                  <div>
                    <h3 className="font-bold">{coin.name}</h3>
                    <p className="text-sm text-gray-400">{coin.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">${coin.current_price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </>
  );
};

export default WalletPage;
