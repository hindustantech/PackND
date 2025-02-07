// auth-service.js
import { auth } from "../firebase-config";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult 
} from "firebase/auth";

const provider = new GoogleAuthProvider();

// Storage service to handle state persistence
const authStateService = {
  setAuthState: (state) => {
    try {
      localStorage.setItem('authState', JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save auth state:', e);
    }
  },
  
  getAuthState: () => {
    try {
      const state = localStorage.getItem('authState');
      return state ? JSON.parse(state) : null;
    } catch (e) {
      console.warn('Failed to get auth state:', e);
      return null;
    }
  },
  
  clearAuthState: () => {
    try {
      localStorage.removeItem('authState');
    } catch (e) {
      console.warn('Failed to clear auth state:', e);
    }
  }
};

/**
 * Sign in with Google using Firebase
 * Attempts popup first, falls back to redirect if necessary
 */
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  try {
    // First try popup
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (popupError) {
    console.log("Popup failed, trying redirect...", popupError);
    
    // Save current path for redirect back
    authStateService.setAuthState({
      pendingSignIn: true,
      returnPath: window.location.pathname
    });

    // Fall back to redirect
    try {
      await signInWithRedirect(auth, provider);
    } catch (redirectError) {
      console.error("Redirect sign-in failed:", redirectError);
      throw redirectError;
    }
  }
};

/**
 * Handle redirect result
 * Call this on app initialization to handle redirect results
 */
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      // Clear pending state
      authStateService.clearAuthState();
      return result.user;
    }
    return null;
  } catch (error) {
    console.error("Error handling redirect result:", error);
    authStateService.clearAuthState();
    throw error;
  }
};

/**
 * Check if there's a pending sign-in
 */
export const hasPendingSignIn = () => {
  const state = authStateService.getAuthState();
  return state?.pendingSignIn === true;
};

/**
 * Get return path after successful sign-in
 */
export const getReturnPath = () => {
  const state = authStateService.getAuthState();
  return state?.returnPath || '/';
};