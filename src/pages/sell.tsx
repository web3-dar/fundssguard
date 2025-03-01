import React, { useState } from 'react';
import BottomNav from './stickyNav';

const WithdrawalPage: React.FC = () => {
  const [balance, setBalance] = useState(81590000); // Example balance in BTC
  const [transactions, setTransactions] = useState([
    { date: '2025-01-25', type: 'Deposit', amount: 0.5, coin: 'Bitcoin', price: 32000 },
    { date: '2025-01-20', type: 'Deposit', amount: 0.25, coin: 'Ethereum', price: 2000 },
  ]);
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [wallet, setWallet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal state for the deposit requirement notice

  // Handle withdrawing coin
  const handleWithdraw = (amountToWithdraw: number, pricePerCoin: number) => {
    const withdrawalAmountInUSD = amountToWithdraw * pricePerCoin;

    setIsLoading(true);

    setTimeout(() => {
      const newBalance = balance - withdrawalAmountInUSD;
      setBalance(newBalance);

      // Add to transaction history
      const newTransaction = {
        date: new Date().toLocaleDateString(),
        type: 'Withdrawal',
        amount: amountToWithdraw,
        coin: 'Bitcoin',
        price: pricePerCoin,
      };
      setTransactions([...transactions, newTransaction]);

      setIsLoading(false);
    }, 2000);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountToWithdraw = parseFloat(amount);
    const pricePerCoin = parseFloat(price);

    if (!amountToWithdraw || !pricePerCoin || !wallet) {
      alert('Please fill out all fields');
      return;
    }

    // Show loading screen first
    setIsLoading(true);

    // After a delay, show the modal
    setTimeout(() => {
      // Show the deposit requirement notice modal
      setShowModal(true);

      // Call the withdrawal process (this can be adjusted as needed)
      handleWithdraw(amountToWithdraw, pricePerCoin);

      // Reset input fields after submission
      setAmount('');
      setPrice('');
      setWallet('');
    }, 2000); // Set the delay to show the loading screen for 2 seconds
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-purple-700 to-indigo-600 text-white py-12 px-6 sm:px-12">
        {/* Dashboard Section */}
        <div className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Bitcoin Withdrawal</h2>

          {/* Balance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div className="bg-purple-600 text-white p-6 rounded-xl shadow-xl flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Balance</h3>
                <p className="text-2xl">${balance.toLocaleString()}</p>
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

        {/* Withdrawal Form */}
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-12">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Withdraw Bitcoin</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-800">
                Amount to Withdraw (BTC)
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-2 block w-full px-4 py-3 text-black bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter amount to withdraw."
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

            <div>
              <label htmlFor="wallet" className="block text-sm font-medium text-gray-800">
                Bitcoin Wallet Address
              </label>
              <input
                type="text"
                id="wallet"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="mt-2 block w-full px-4 py-3 text-black bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter your Bitcoin wallet address"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-purple-600 text-black font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
            >
              Withdraw Bitcoin
            </button>
          </form>
        </div>
      </div>

      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800 z-50">
          <div className="text-white text-xl font-semibold">
            Processing withdrawal...
          </div>
        </div>
      )}

      {/* Deposit Requirement Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Deposit Requirement</h3>
            <p className="text-lg text-gray-600 mb-6">
              You must have made a deposit of at least $50,000 before you can withdraw any funds.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </>
  );
};

export default WithdrawalPage;
