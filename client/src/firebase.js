// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e3016.firebaseapp.com",
  projectId: "mern-estate-e3016",
  storageBucket: "mern-estate-e3016.appspot.com",
  messagingSenderId: "591290118290",
  appId: "1:591290118290:web:9a9ba6f01a97a08d80b64b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);