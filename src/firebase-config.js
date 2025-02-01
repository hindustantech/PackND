import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDEiktyhHM8QAXGT4dDCLbTp61-TulHKfM",
  authDomain: "packnd-694ba.firebaseapp.com",
  projectId: "packnd-694ba",
  storageBucket: "packnd-694ba.appspot.com",
  messagingSenderId: "783045027871",
  appId: "1:783045027871:android:348fab21d038487c760d2a",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const auth = getAuth(app);
const messaging = getMessaging(app); // Initialize messaging
// const googleProvider = new GoogleAuthProvider();

// Export Firebase services
export { auth, messaging, getToken, onMessage };