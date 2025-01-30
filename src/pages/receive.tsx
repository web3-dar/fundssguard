import React, { useState, useEffect } from "react";
import Bar from '../assets/bar.png'
import BottomNav from "./stickyNav";
import { FaClipboard } from "react-icons/fa";

const ReceiveCoinPage: React.FC = () => {
  const fakeWalletId = "bc1qxt8wjjyr6785jvwu83jvrq24x73ud8yetvr66q";
  const [copied, setCopied] = useState(false);
  const [coinPrice, setCoinPrice] = useState<number | null>(null);
   // Fake wallet balance (in BTC)
  const [loading, setLoading] = useState(true);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(fakeWalletId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  useEffect(() => {
    const fetchCoinPrice = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice/BTC.json");
        const data = await response.json();
        const price = data.bpi.USD.rate_float;
        setCoinPrice(price);
      } catch (error) {
        console.error("Error fetching coin price:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinPrice();
    const interval = setInterval(fetchCoinPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  
  return (
    <>
    
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <button className="text-lg font-bold text-gray-700">&lt;</button>
        <h1 className="text-2xl font-bold text-gray-800">Receive Coin</h1>
        <div />
      </div>

      {/* Wallet Balance */}
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg p-6 mb-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Account 1</h2>
        <p className="text-gray-600 text-lg">
          {/* <span className="font-bold"> 5 BTC</span>{" "} */}
         
           
        </p>
      </div>

      {/* Live Coin Price */}
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg p-6 mb-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Bitcoin Price</h2>
        <p className="text-gray-600 text-lg">
          {loading ? (
            <span>Loading...</span>
          ) : coinPrice ? (
            <>
              <span className="font-bold text-green-600">${coinPrice.toFixed(2)} USD</span>{" "}
              <span className="text-sm text-gray-500">per BTC</span>
            </>
          ) : (
            <span className="text-red-500">Unable to fetch price</span>
          )}
        </p>
      </div>

      {/* Barcode */}
      <div className="w-full max-w-sm flex flex-col items-center mb-8">
        {/* <Barcode value={fakeWalletId} /> */}
        <img src={Bar} alt="" />
        <p className="text-gray-500 text-sm mt-2">Scan this barcode to receive coins.</p>
      </div>

      {/* Wallet ID */}
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg p-6 mb-6 shadow-lg">
        <p className="text-gray-700 font-medium mb-2">Your Wallet ID</p>
        <div className="flex items-center justify-between">
          <span className="text-black text-sm truncate">{fakeWalletId}</span>
          <button
            onClick={handleCopyToClipboard}
            className="ml-4 text-blue-500 text-sm border border-blue-500 px-3 py-1 rounded-md hover:bg-blue-100 transition"
          >
            {copied ? "Copied!" : <FaClipboard/>}
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
        <ul className="text-gray-600">
          <li className="flex justify-between border-b py-2">
            <span>1.0 BTC</span>
            <span className="text-gray-500">$101,500</span>
          </li>
          <li className="flex justify-between border-b py-2">
            <span>1.0 BTC</span>
            <span className="text-gray-500">$100,000</span>
          </li>
          <li className="flex justify-between py-2">
            <span>1.0 BTC</span>
            <span className="text-gray-500">$101,000</span>
          </li>
        </ul>
      </div>
    </div>
    <BottomNav/>
    </>
  );
};

export default ReceiveCoinPage;
