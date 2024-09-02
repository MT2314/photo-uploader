// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;
