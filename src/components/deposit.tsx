import React, { useState } from "react";
import BottomNav from "../pages/stickyNav";

const WalletTransferPage: React.FC = () => {
  const [walletId, setWalletId] = useState("");
  const [amount, setAmount] = useState<number | "">(0);
  const [balance, setBalance] = useState(1500.0); // Current wallet balance (example)
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "creditCard">("wallet");

  // Credit Card state
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [cardError, setCardError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletId || !amount || Number(amount) <= 0) {
      setError("Please fill in all fields correctly.");
      return;
    }

    // Credit card validation
    if (paymentMethod === "creditCard") {
      if (!/^\d{16}$/.test(cardNumber)) {
        setCardError("Please enter a valid 16-digit card number.");
        return;
      }
      if (!/^\d{3,4}$/.test(cardCVC)) {
        setCardError("Please enter a valid CVC (3 or 4 digits).");
        return;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
        setCardError("Please enter a valid expiry date (MM/YY).");
        return;
      }
      setCardError("");
    }

    setError("");
    // Example recharge logic
    setBalance((prev) => prev + Number(amount));
    setWalletId("");
    setAmount("");
    setCardNumber("");
    setCardExpiry("");
    setCardCVC("");
    alert("Recharge successful!");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6 flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-6">
          {/* <button className="text-lg font-bold text-gray-700">&lt; Back</button> */}
          <h1 className="text-2xl font-thin text-center text-gray-800">Wallet Transfer</h1>
          <div />
        </div>

        {/* Wallet Balance */}
        <div className="w-full max-w-md bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-medium">Your Wallet Balance</h2>
          <p className="text-2xl font-bold mt-2">$0.00</p>
          <p className="text-sm mt-1">Keep your balance updated to continue transactions.</p>
        </div>

        {/* Payment Method Selection */}
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6 flex justify-between items-center">
          <button
            onClick={() => setPaymentMethod("wallet")}
            className={`${
              paymentMethod === "wallet" ? "bg-blue-500 text-white" : "text-blue-500"
            } w-1/2 py-2 rounded-md font-medium`}
          >
            Wallet
          </button>
          <button
            onClick={() => setPaymentMethod("creditCard")}
            className={`${
              paymentMethod === "creditCard" ? "bg-blue-500 text-white" : "text-blue-500"
            } w-1/2 py-2 rounded-md font-medium`}
          >
            Credit Card
          </button>
        </div>

        {/* Recharge Form */}
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recharge Wallet</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {cardError && <p className="text-red-500 text-sm mb-4">{cardError}</p>}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Wallet ID */}
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 font-medium">Wallet ID</span>
              <input
                type="text"
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
                placeholder="Enter your wallet ID"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            {/* Amount */}
            <label className="flex flex-col gap-1">
              <span className="text-gray-700 font-medium">Recharge Amount ($)</span>
              <input
                type="number"
                value={amount === 0 ? "" : amount} // Ensure it displays the correct number
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter recharge amount"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            {/* Payment Method Form */}
            {paymentMethod === "creditCard" && (
              <>
                <label className="flex flex-col gap-1">
                  <span className="text-gray-700 font-medium">Card Number</span>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Enter your card number"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <div className="flex gap-4">
                  <label className="flex flex-col gap-1 w-1/2">
                    <span className="text-gray-700 font-medium">Expiry Date (MM/YY)</span>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex flex-col gap-1 w-1/2">
                    <span className="text-gray-700 font-medium">CVC</span>
                    <input
                      type="text"
                      value={cardCVC}
                      onChange={(e) => setCardCVC(e.target.value)}
                      placeholder="CVC"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </>
            )}

            {/* Transaction Summary */}
            {walletId && amount  && (
              <div className="bg-gray-100 border border-gray-300 rounded-md p-4 text-gray-700">
                <h3 className="font-semibold mb-2">Transaction Summary</h3>
                <p className="text-sm">
                  Wallet ID: <span className="font-medium">{walletId}</span>
                </p>
                <p className="text-sm">
                  Recharge Amount: <span className="font-medium">${Number(amount).toFixed(2)}</span>
                </p>
                <p className="text-sm">
                  Updated Balance: <span className="font-medium">${(balance + Number(amount)).toFixed(2)}</span>
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-md font-medium hover:opacity-90"
            >
              Recharge Wallet
            </button>
          </form>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default WalletTransferPage;
