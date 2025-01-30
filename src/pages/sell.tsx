// src/SellCoinPage.tsx
import React, { useState } from 'react';
import BottomNav from './stickyNav';

const SellCoinPage: React.FC = () => {
  // States for balance and transactions
  const [balance, setBalance] = useState(90153030); // Example balance in BTC
  const [transactions, setTransactions] = useState([
    { date: '2025-01-25', type: 'Sell', amount: 0.5, coin: 'Bitcoin', price: 32000 },
    { date: '2025-01-20', type: 'Sell', amount: 0.25, coin: 'Ethereum', price: 2000 },
  ]);

  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  // Handle selling coin
  const handleSell = (amountToSell: number, pricePerCoin: number) => {
    if (amountToSell <= balance) {
      const newBalance = balance - amountToSell;
      setBalance(newBalance);

      // Add to transaction history
      const newTransaction = {
        date: new Date().toLocaleDateString(),
        type: 'Sell',
        amount: amountToSell,
        coin: 'Bitcoin', // Default to Bitcoin
        price: pricePerCoin,
      };
      setTransactions([...transactions, newTransaction]);
    } else {
      alert('Insufficient balance');
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountToSell = parseFloat(amount);
    const pricePerCoin = parseFloat(price);
    if (!amountToSell || !pricePerCoin) {
      alert('Please fill out all fields');
      return;
    }
    handleSell(amountToSell, pricePerCoin);
    setAmount('');
    setPrice('');
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-r from-purple-700 to-indigo-600 text-white py-12 px-6 sm:px-12">
      {/* Dashboard Section */}
      <div className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Dashboard</h2>

        {/* Balance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          <div className="bg-purple-600 text-white p-6 rounded-xl shadow-xl flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Balance</h3>
              <p className="text-2xl">$901,530.30</p>
              <p></p>
            </div>
            <div>
              <svg className="w-12 h-12 text-white opacity-60" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm-1-14h2v5h-2zm0 7h2v2h-2z"></path></svg>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h3>
        <div className="overflow-x-auto bg-gray-100 p-6 rounded-xl shadow-xl">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-500 uppercase bg-gray-200">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Coin</th>
                <th className="px-6 py-4">Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-3">{transaction.date}</td>
                  <td className="px-6 py-3">{transaction.type}</td>
                  <td className="px-6 py-3">{transaction.amount} BTC</td>
                  <td className="px-6 py-3">{transaction.coin}</td>
                  <td className="px-6 py-3">${transaction.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sell Coin Form */}
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-12">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Sell Coin</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-800">
              Amount to Sell
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter amount to sell"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-800">
              Price per Coin (USD)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
              placeholder="Enter price per coin in USD"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-purple-600 text-black font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
          >
            Sell Coin
          </button>
        </form>
      </div>
    </div>
    
  <BottomNav/>  
    </>
  );
};

export default SellCoinPage;
