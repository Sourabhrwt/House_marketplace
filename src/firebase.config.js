// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn5GMPTIclAER0k1cwEt9wwTSAa88tegY",
  authDomain: "house-market-7a393.firebaseapp.com",
  projectId: "house-market-7a393",
  storageBucket: "house-market-7a393.appspot.com",
  messagingSenderId: "750553198174",
  appId: "1:750553198174:web:6ec773224c6570333fcecf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()