// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging"; // Import messaging

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
export const messaging = getMessaging(app); // Initialize Firebase Messaging

// Function to get the FCM registration token
export const getFirebaseMessageToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BJYE4xKOlwSgpk_OiAS5mgg74JSxyJIYFcT1M-XeWNJOqbYPAIOmYf5pKhilrn7Xp0rmiA9sn9aSMJ_8OCvhonU", // Replace with your actual VAPID public key
    });
    return token;
  } catch (error) {
    console.error("An error occurred while retrieving token: ", error);
    return null;
  }
};

// Listener for foreground messages
export const onForegroundMessage = (callback) => {
  onMessage(messaging, (payload) => {
    console.log("Message received in foreground: ", payload);
    callback(payload); // Call the provided callback with the payload
  });
};
