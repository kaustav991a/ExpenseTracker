// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9_5iTyTdbv3JEvvt9sd8jcunjrY2uDzo",
  authDomain: "expense-tracker-d6c9f.firebaseapp.com",
  projectId: "expense-tracker-d6c9f",
  storageBucket: "expense-tracker-d6c9f.firebasestorage.app",
  messagingSenderId: "233416158299",
  appId: "1:233416158299:web:950af5faf3cbb0b294a37e",
  measurementId: "G-51C4S317VT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
