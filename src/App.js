import Home from "./Component/Home";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import './App.css'; // Import the CSS file in your App.js
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Profile from "./Component/Profile";
import WalletPage from "./Component/WalletPage";
import History from "./Component/History";
import Meal from "./Component/Meal";
import Lunch from "./Component/Lunch";
import Dinner from "./Component/Dinner";
import Register from "./auth/Register";
import Login from "./auth/Login";
import PaymentPage from "./Component/PaymentPage";
import UserProfile from "./Component/UserProfile";
import Referal from "./Component/Referal";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/ref" element={<Referal/>} />
          
          <Route path="/history" element={<History />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/" element={<Meal />} />
          <Route path="/lunch" element={<Lunch />} />
          <Route path="/diner" element={<Dinner />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/user" element={<UserProfile/>} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;