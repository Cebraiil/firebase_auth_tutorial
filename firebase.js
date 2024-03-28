// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Importing getAuth function

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASMirPnuY8lgtn7POrmrdODl7D1euijU4",
    authDomain: "user-auth-67c7f.firebaseapp.com",
    projectId: "user-auth-67c7f",
    storageBucket: "user-auth-67c7f.appspot.com",
    messagingSenderId: "977320656571",
    appId: "1:977320656571:web:3a28eb52851e292fba739e",
    measurementId: "G-08L3Z3PZBC"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the auth object directly from the auth module
const auth = getAuth(app);

export { auth };
