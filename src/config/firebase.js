// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAzZDuerAqwpOiGaEtmkFOVjIJ8XDwXoDQ",
  authDomain: "vite-contact-91bc9.firebaseapp.com",
  projectId: "vite-contact-91bc9",
  storageBucket: "vite-contact-91bc9.appspot.com",
  messagingSenderId: "202754710829",
  appId: "1:202754710829:web:43bf9e852980c914e687a4"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export to use in other files
export { db };
