import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { DataContext } from './DataContext';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <GoogleOAuthProvider clientId='1049011506017-8b31tv27vbi4suls3pbb4j3ijfuaeqsm.apps.googleusercontent.com'>
    <App />
  </GoogleOAuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
