// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1-OeRt37mba0N9CkVenELWVdEYu5aZ6Y",
  authDomain: "edward--nicole-wedding.firebaseapp.com",
  projectId: "edward--nicole-wedding",
  storageBucket: "edward--nicole-wedding.appspot.com",
  messagingSenderId: "1023143599362",
  appId: "1:1023143599362:web:a3aa48b7d1d9b4db05761b",
  measurementId: "G-5FLLC156NW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore and Analytics
const db = getFirestore(app);
export const analytics = getAnalytics(app);

export { db };
export default app;
