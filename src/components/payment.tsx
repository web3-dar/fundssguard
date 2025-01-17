import { FaSearch, FaFilter } from "react-icons/fa";
import BottomNav from "../pages/stickyNav";

const ExchangePage = () => {
  const cryptoData = [
    { name: "ETH", revenue: "$360,6M", price: "$1,878.80", change: -1.62 },
    { name: "arb_ETH", revenue: "$132,18M", price: "$1,878.80", change: 1.62 },
    { name: "WBTC", revenue: "$50,56M", price: "$30,001.96", change: -1.64 },
    { name: "ARB", revenue: "$31,55M", price: "$1.11", change: 3.71 },
    { name: "WETH", revenue: "$24,34M", price: "$1,878.56", change: -1.62 },
    { name: "MATIC", revenue: "$19,36M", price: "$0.666", change: -4.42 },
    { name: "OP_ETH", revenue: "$15,5M", price: "$1,878.47", change: 1.62 },
    { name: "WBTC", revenue: "$11,5M", price: "$30,034.60", change: -0.57 },
  ];

  return (
    <>
      <div className="bg-black text-white min-h-screen font-sans">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-white">Market</h1>
            <h2 className="text-gray-400">Trade</h2>
          </div>
          <FaFilter className="text-gray-400 text-lg cursor-pointer" />
        </header>

        {/* Search Bar */}
        <div className="px-4 py-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Swap over 210.00 tokens on more than 10 chains"
              className="w-full bg-gray-900 text-gray-300 py-2 px-4 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 px-4 py-2 text-sm font-medium">
          {["All", "Favorites", "Attractive", "Meme", "Staking"].map((tab, index) => (
            <button
              key={index}
              className={`${
                index === 0
                  ? "text-white font-semibold border-b-2 border-red-500"
                  : "text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-3 text-gray-400 text-sm pb-2 border-b border-gray-800">
            <div>Name/Revenue</div>
            <div className="text-right">Last Price</div>
            <div className="text-right">24h Change</div>
          </div>
          {cryptoData.map((crypto, index) => (
            <div
              key={index}
              className="grid grid-cols-3 items-center py-4 border-b border-gray-800 hover:bg-gray-900 transition"
            >
              {/* Name/Revenue */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full" /> {/* Placeholder for icon */}
                <div>
                  <p className="text-white font-semibold">{crypto.name}</p>
                  <p className="text-gray-400 text-sm">{crypto.revenue}</p>
                </div>
              </div>
              {/* Last Price */}
              <div className="text-right text-white">{crypto.price}</div>
              {/* 24h Change */}
              <div
                className={`text-right font-semibold ${
                  crypto.change > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {crypto.change > 0 ? "+" : ""}
                {crypto.change.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default ExchangePage;
