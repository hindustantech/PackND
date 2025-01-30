import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css"; // Import the CSS file in your App.js
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
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
import ContactUs from "./Component/ContactUs";
import ForgotPassword from "./auth/ForgotPassword";
import OTP from "./auth/OTP";
import ChangePassword from "./auth/ChangePassword";
import { requestPermission, listenForMessages } from "./firebase-notification";
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const handleEnableNotifications = async () => {
    await requestPermission();
    listenForMessages();
  };

  useEffect(() => {
    handleEnableNotifications();
  }, []);

  useEffect(() => {
    GoogleAuth.initialize({
      clientId: GOOGLE_CLIENT_ID, // Ensure you pass the client ID
      scopes: ["profile", "email"],
      grantOfflineAccess: true, // Ensures refresh token is available
    });
  }, []);
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/ref" element={<Referal />} />

          <Route path="/history" element={<History />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/" element={<Meal />} />
          <Route path="/lunch" element={<Lunch />} />
          <Route path="/diner" element={<Dinner />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/OTP" element={<OTP />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
