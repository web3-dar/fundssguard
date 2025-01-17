import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Show loading screen
    setIsLoading(true);

    // Hide loading screen after 3 seconds and navigate to the login/signup page
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login'); // Navigate to login page (you can change this to your signup page route)
    }, 3000); // 3 seconds loading time
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-purple-50  text-white overflow-hidden">
      {/* Background Clouds */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gray-700 rounded-full opacity-10 blur-2xl"></div>
      <div className="absolute top-20 right-20 w-40 h-40 bg-gray-700 rounded-full opacity-10 blur-2xl"></div>

      {/* Mobile Illustration */}
      <div className="mb-10">
        <img
          src={logo} // Replace with the actual path to your logo
          alt="Mobile Illustration"
          className="w-[250px]"
        />
      </div>

      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-opacity-70 bg-black">
          {/* Tailwind Spinner */}
          <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>

          {/* Custom CSS Spinner (Fallback) */}
          {/* <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full custom-spin"></div> */}
        </div>
      )}

      {/* Text Content */}
      {!isLoading && (
        <div className="flex justify-start items-start h-screen p-8 animate__animated animate__fadeInLeft">
          <div className="text-left">
            <h1 className="text-3xl font-semibold text-start mb-1 animate__animated animate__fadeInLeft animate__delay-1s text-purple-500">
              Welcome to FundsGuard!
            </h1>
            <p className="text-gray-300 mb-2 p-3 animate__animated animate__fadeInLeft animate__delay-2s text-purple-500">
              A leading financial recovery  institution offering a wide range of  services.
            </p>
            {/* Slider Placeholder */}
            <div className="flex justify-start gap-2 mb-6">
              <div className="w-5 h-1 bg-white"></div>
              <div className="w-5 h-1 bg-white opacity-50"></div>
              <div className="w-5 h-1 bg-white opacity-50"></div>
            </div>
            {/* Get Started Button */}
            <button
              onClick={handleGetStarted}
              className="bg-black text-[#fff] font-semibold px-9 py-3 rounded-lg shadow-md hover:bg-purple-500 transition animate__animated animate__fadeInLeft animate__delay-3s"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
