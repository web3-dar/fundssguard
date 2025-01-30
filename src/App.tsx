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



const App: React.FC = () => {
  return (
    <Router>
      <div className="font-sans">
        <Routes>
         
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/buy" element={<BuyBTCPage />} />
          <Route path="/receive" element={<ReceiveCoinPage />} />
          <Route path="/pin" element={<Confirmation />} />
          <Route path="/exchange" element={<ExchangePage />} />
          <Route path="/deposit" element={<DepositsPage />} />
          <Route path="/loan" element={<LoanPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/cards" element={<MyCards />} />
          <Route path="/earn" element={<CryptoDashboard />} />
          <Route path="/withdraw" element={<WithdrawCoinPage />} />
          
          
          
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
