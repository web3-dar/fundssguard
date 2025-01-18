import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdWarning } from "react-icons/io";
import img from "../assets/person_1.jpg";

const Confirmation: React.FC = () => {
  const [pin, setPin] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const validPin = "5321"; // Hardcoded valid PIN
  const userName = "Leigh Ann Sanford"; // Replace with dynamic user name if needed
  const userImage = img; // Replace with the user's profile picture URL

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 4) {
      setPin(e.target.value); // Restrict input to 4 digits
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === validPin) {
      setIsLoading(true); // Show loading screen
      setTimeout(() => {
        setIsLoading(false); // Hide loading screen after 5 seconds
        navigate("/dashboard"); // Navigate to the dashboard
      }, 5000);
    } else {
      setErrorMessage("Incorrect PIN. Please try again.");
      setTimeout(() => setErrorMessage(null), 3000); // Clear the error message after 3 seconds
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50 relative">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-purple-500 border-dotted rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-semibold text-black">Processing...</p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
          {/* User Image */}
          <img
            src={userImage}
            alt="User Profile"
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          {/* User Name */}
          <h1 className="text-xl font-bold text-black mb-2">{userName}</h1>
          <p className="text-gray-500 mb-6">Please confirm your PIN to proceed</p>

          {/* PIN Input Form */}
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <input
                type="password"
                value={pin}
                onChange={handleInputChange}
                placeholder="Enter 4-digit PIN"
                maxLength={4}
                className="w-48 h-16 py-2 text-center text-xl font-semibold bg-purple-50 border border-purple-200 rounded-md outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center justify-center text-red-500 mb-4">
                <div className="text-lg mr-2">
                  <IoMdWarning />
                </div>
                <p>{errorMessage}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white font-semibold rounded-md py-2 hover:bg-gray-800 transition"
            >
              Confirm
            </button>
          </form>

          {/* Reset or Create PIN */}
          <div className="text-sm">
            <p>
              Forgot PIN?{" "}
              <span className="text-purple-500 font-semibold cursor-pointer">
                Reset PIN
              </span>
            </p>
            <p>
              Don’t have a PIN?{" "}
              <span className="text-purple-500 font-semibold cursor-pointer">
                Create PIN
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Confirmation;
