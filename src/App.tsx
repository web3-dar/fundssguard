import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import 'animate.css';
import LoginForm from './pages/login';
import Confirmation from './pages/confirmation';
import Dashboard from './pages/dashboard';

import DepositsPage from './components/deposit';
import LoanPage from './components/loan';
// import TransactionHistory from './pages/history';
import MyCards from './pages/myCards';

import ExchangePage from './components/payment';
import CryptoDashboard from './pages/settings';
import WalletPage from './pages/history';
import BuyBTCPage from './pages/buyBTC';
import ReceiveCoinPage from './pages/receive';
import WithdrawCoinPage from './pages/sell';
import ProtectedRoute from './pages/protect';



const App: React.FC = () => {
  return (
    <Router>
      <div className="font-sans">
        <Routes>
         
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/pin" element={<Confirmation />} />

          
          <Route path="/buy" element={
            <ProtectedRoute><BuyBTCPage />
              </ProtectedRoute>} />
        
          <Route path="/receive" element={
            <ProtectedRoute><ReceiveCoinPage />
              </ProtectedRoute>} />
          
          <Route path="/exchange" element={
            <ProtectedRoute><ExchangePage />
              </ProtectedRoute>} />
          <Route path="/deposit" element={
             <ProtectedRoute><DepositsPage />
              </ProtectedRoute>
              } />
          <Route path="/loan" element={
             <ProtectedRoute> <LoanPage />
              </ProtectedRoute>
             } />
          <Route path="/wallet" element={
             <ProtectedRoute> <WalletPage />
              </ProtectedRoute>
             } />
          <Route path="/cards" element={
             <ProtectedRoute><MyCards />
              </ProtectedRoute>
              } />
          <Route path="/earn" element={
             <ProtectedRoute><CryptoDashboard />
              </ProtectedRoute>
              } />
          <Route path="/withdraw" element={
            
            <ProtectedRoute><WithdrawCoinPage />
              </ProtectedRoute>
              } />
          
          
          
          <Route path="/dashboard" element={
            
            <ProtectedRoute><Dashboard />
              </ProtectedRoute>
              } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
