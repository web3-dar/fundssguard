import React, { useState } from "react";
import { FaBitcoin } from "react-icons/fa";
import BottomNav from "./stickyNav";

const BuyBTCPage: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("VND");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  const handleBuyClick = () => {
    alert(`You are buying BTC with ${amount} ${currency}`);
  };

  return (
    <>
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <button className="text-lg font-bold text-black">&lt;</button>
        <h1 className="text-xl font-bold text-black">Buy BTC</h1>
        <button className="text-lg font-bold text-green-500">Sell</button>
      </div>

      {/* Content */}
      <div className="w-full max-w-md">
        {/* BTC Icon */}
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
            <FaBitcoin/>
          </div>
          <span className="text-lg font-bold text-black">Buy BTC</span>
        </div>

        {/* Input Section */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            I want to pay
          </label>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Please enter quantity"
              className="flex-1 p-3 text-black text-sm outline-none"
            />
            <select
              value={currency}
              onChange={handleCurrencyChange}
              className="p-3 text-sm bg-gray-100 text-black border-l border-gray-300 outline-none"
            >
              <option value="VND">VND</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            188.308 - 300,000,000 USD
          </p>
        </div>

        {/* Buy Button */}
        <button
          onClick={handleBuyClick}
          className="w-full bg-green-500 text-white font-bold py-3 rounded-md"
        >
          Buy
        </button>
      </div>
    </div>
    <BottomNav/>
    </>
  );
};

export default BuyBTCPage;
