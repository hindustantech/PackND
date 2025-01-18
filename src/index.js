import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { DataContext } from './DataContext';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <GoogleOAuthProvider clientId='127369270911-3t64pbn2f7477jema1h7qrrkomqp2h23.apps.googleusercontent.com","project_id":"vibrant-crawler-447710-t5","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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'>
    <App />
  </GoogleOAuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
