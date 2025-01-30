import { useState, useEffect } from "react";
import axios from "axios";
import BottomNav from "./stickyNav";
import { FaSyncAlt, FaWallet, FaCoins, FaArrowDown } from "react-icons/fa";
import person from '../assets/person_1.jpg'
import { Link } from "react-router-dom";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const Dashboard = () => {
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCryptoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoData();
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <div className="bg-purple-700 text-white p-4 flex justify-between items-center sticky top-0 z-10">
          <img src={person} width="40" className="rounded-full h-[40px]" />
          <h1 className="text-lg font-thin">Crypto Dashboard</h1>
          <div className="cursor-pointer text-white" onClick={refreshPage}>
            <FaSyncAlt />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row lg:space-x-6 lg:px-6 mt-8">
          {/* Left Section */}
          <div className="lg:w-1/3 space-y-6">
            {/* Total Balance Section */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg rounded-xl p-6">
              <h2 className="text-lg font-medium">Portfolio Value</h2>
              <h1 className="text-4xl font-bold mt-2">$901,530.30</h1>
              <p className="mt-2 text-sm text-purple-200">+5.20% (24h)</p>
            </div>

            {/* Actions Section */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
              {/* Buy Crypto */}
             <Link to="/buy">
             <button className="flex items-center p-4 bg-purple-50 text-purple-700 rounded-lg shadow hover:shadow-lg hover:bg-purple-100 transition">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <FaCoins className="text-2xl" />
                </div>
                <p className="ml-4 text-sm font-semibold">Buy Crypto</p>
              </button>
             </Link> 

              {/* Deposit Funds */}
             <Link to='/deposit'>
             <button className="flex items-center p-4 bg-green-50 text-green-700 rounded-lg shadow hover:shadow-lg hover:bg-green-100 transition">
                <div className="bg-green-100 p-3 rounded-lg">
                  <FaWallet className="text-2xl" />
                </div>
                <p className="ml-4 text-sm font-semibold">Deposit Funds</p>
              </button>
             </Link> 

              {/* Receive Crypto */}
             <Link to='/receive'>
             <button className="flex items-center p-4 bg-blue-50 text-blue-700 rounded-lg shadow hover:shadow-lg hover:bg-blue-100 transition">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaArrowDown className="text-2xl" />
                </div>
                <p className="ml-4 text-sm font-semibold">Receive Crypto</p>
              </button>
             </Link> 

              {/* Earn Rewards */}
             <Link to="/earn"><button className="flex items-center p-4 bg-yellow-50 text-yellow-700 rounded-lg shadow hover:shadow-lg hover:bg-yellow-100 transition">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <FaCoins className="text-2xl" />
                </div>
                <p className="ml-4 text-sm font-semibold">Earn Rewards</p>
              </button>
             </Link> 
             <Link to="/sell"><button className="flex items-center p-4 bg-red-50 text-yellow-700 rounded-lg shadow hover:shadow-lg hover:bg-yellow-100 transition">
                <div className="bg-red-100 p-3 rounded-lg">
                  <FaCoins className="text-2xl" />
                </div>
                <p className="ml-4 text-sm font-semibold">Sell Coin</p>
              </button>
             </Link> 
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:w-2/3 mt-6 lg:mt-0">
            {/* Cryptocurrency List */}
            <h2 className="text-gray-700 font-medium mb-4 px-4 lg:px-0">
              Top Cryptocurrencies
            </h2>
            <div className="space-y-4 px-4 lg:px-0">
              {loading ? (
                <p className="text-center text-gray-500">Loading crypto data...</p>
              ) : (
                cryptoData.map((coin) => (
                  <div
                    key={coin.id}
                    className="bg-white shadow-lg p-4 rounded-lg flex items-center justify-between hover:shadow-xl transition"
                  >
                    <div className="flex items-center">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="h-10 w-10 mr-4"
                      />
                      <div>
                        <p className="font-semibold">{coin.name}</p>
                        <p className="text-sm text-gray-500">
                          {coin.symbol.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700 font-bold">
                        ${coin.current_price.toLocaleString()}
                      </p>
                      <p
                        className={`text-sm ${
                          coin.price_change_percentage_24h > 0
                            ? "bg-green-500 text-white p-1"
                            : "text-[#fff] bg-red-500 p-1 "
                        }`}
                      >
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default Dashboard;
