import { useState } from 'react';
import visa from '../assets/person_1.jpg'; // Path to your profile picture
import cardLogo from '../assets/chip.png'; // Example for Visa/MasterCard logo
import { FaCreditCard } from 'react-icons/fa';
import BottomNav from './stickyNav';

const MyCards = () => {
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);

  const handleDetailClick = (detail: string) => {
    setSelectedDetail(detail === selectedDetail ? null : detail);
  };

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
        {/* Header Section */}
        <div className="w-full max-w-4xl flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src={visa}
              alt="Profile"
              className="w-12 h-12 rounded-full shadow-md"
            />
            <FaCreditCard size={24} className="text-purple-600" />
          </div>
          <button className="text-purple-600 text-2xl">
            <i className="fas fa-sync-alt"></i>
          </button>
        </div>

        {/* Toggle Tabs */}
        <div className="w-full max-w-4xl flex mb-6 p-1">
          <button className="flex-1 px-4 py-2 bg-white shadow-md font-medium text-black">
            Credit Card
          </button>
          <button
            className="flex-1 px-4 py-2 bg-gray-300 shadow-md text-gray-400 font-medium"
            disabled
          >
            Debit Card (disabled)
          </button>
        </div>

        {/* Card Display */}
        <div className="w-full max-w-lg bg-gray-900 text-white h-[250px] p-4 rounded-xl shadow-lg mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold">BALANCE</h2>
            <img src={cardLogo} alt="Visa" className="w-10" />
          </div>
          <h1 className="text-3xl font-semibold">$901,530.30</h1>
          <div className="mt-4">
            <p className="font-medium text-sm text-gray-400">CARD NUMBER</p>
            <p className="text-xl font-bold tracking-wide mt-1">
              XXXX-XXXX-XXXX-2399
            </p>
          </div>
          <div className="flex justify-between mt-2">
            <div>
              <p className="font-medium text-sm text-gray-400">EXPIRY</p>
              <p className="text-sm font-bold">XX / XX</p>
            </div>
            <div>
              <p className="font-medium text-sm text-gray-400">CCV</p>
              <p className="text-sm font-bold">XXX</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-4xl flex gap-4 mb-6">
          <button className="flex-1 bg-yellow-500 text-white py-3 rounded-lg shadow-lg font-semibold hover:bg-yellow-600">
            Request Card
          </button>
          <button className="flex-1 bg-teal-500 text-white py-3 rounded-lg shadow-lg font-semibold hover:bg-teal-600">
            Need Help?
          </button>
        </div>

        {/* Card Details Section */}
        <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md">
          {[
            { label: 'Name On Card', value: 'Leigh Ann Sanford' },
            { label: 'Card Number', value: 'XXXX-XXX-XXXX-2399' },
            { label: 'Expiry Date', value: 'XX/XX' },
            { label: 'CVC', value: 'XXX' },
          ].map((detail, index) => (
            <div
              key={index}
              onClick={() => handleDetailClick(detail.label)}
              className={`flex justify-between items-center py-3 border-b cursor-pointer transition-all ${
                selectedDetail === detail.label
                  ? 'bg-gray-100 rounded-md shadow-sm'
                  : ''
              }`}
            >
              <p className="font-medium text-gray-700">{detail.label}</p>
              <p className="text-gray-500">{detail.value}</p>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default MyCards;
