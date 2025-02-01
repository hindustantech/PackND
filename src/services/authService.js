import { auth } from "../firebase-config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

/**
 * Sign in with Google using Firebase
 */
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // return the Firebase user object
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
    throw error;
  }
};   //it    working fine but in the   app  redrirect it in the web  fix  it