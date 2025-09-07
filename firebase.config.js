// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAuSv9O59nvnVRDgvgXr9bW58HesJT7wNQ",
//   authDomain: "unishare-3b770.firebaseapp.com",
//   projectId: "unishare-3b770",
//   storageBucket: "unishare-3b770.firebasestorage.app",
//   messagingSenderId: "1078577179888",
//   appId: "1:1078577179888:web:5a68bf38a3de20405d2635"
// };
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey ,
  authDomain: import.meta.env.VITE_authDomain ,
  projectId: import.meta.env.VITE_projectId ,
  storageBucket: import.meta.env.VITE_storageBucket ,
  messagingSenderId: import.meta.env.VITE_messagingSenderId ,
  appId: import.meta.env.VITE_appId 
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);