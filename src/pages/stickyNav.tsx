import React from "react";
import { Link } from "react-router-dom";
import { FaChartBar, FaExchangeAlt, FaHome, FaWallet } from "react-icons/fa";

const BottomNav: React.FC = () => {
  return (
    <nav className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-around">
       <Link
        to="/dashboard"
        className="flex flex-col items-center text-gray-600 hover:text-orange-400 hover:font-extrabold"
      >
        <FaHome className="text-2xl" />
        <span className="text-xs mt-1">Home</span>
      </Link>

     
      <Link
        to="/exchange"
        className="flex flex-col items-center text-gray-600 hover:text-orange-400 hover:font-extrabold"
      >
        <FaExchangeAlt/>
        <span className="text-xs mt-1">Exchange</span>
      </Link>
      <Link
        to="/wallet"
        className="flex flex-col items-center text-gray-600 hover:text-orange-400 hover:font-extrabold"
      >
       <FaWallet/>
        <span className="text-xs mt-1">Wallet</span>
      </Link>
      <Link
        to="/earn"
        className="flex flex-col items-center text-gray-600 hover:text-orange-400 hover:font-extrabold"
      >
       <FaChartBar/>
        <span className="text-xs mt-1">Earn</span>
      </Link>
    
      {/* <Link
        to="/cards"
        className="flex flex-col items-center text-gray-600 hover:text-orange-400 hover:font-extrabold"
      >
        <span className="material-icons">credit_card</span>
        <span className="text-xs mt-1">My Cards</span>
      </Link> */}
      {/* <Link
        to="/settings"
        className="flex flex-col items-center text-gray-600 hover:text-orange-400 hover:font-extrabold"
      >
        <span className="material-icons">settings</span>
        <span className="text-xs mt-1">Settings</span>
      </Link> */}
    </nav>
  );
};

export default BottomNav;
