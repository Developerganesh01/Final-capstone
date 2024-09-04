import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMJL5dqmpkopmaw_2jeCzLa2V7Bo-rRnU",
  authDomain: "final-capstone-62f76.firebaseapp.com",
  projectId: "final-capstone-62f76",
  storageBucket: "final-capstone-62f76.appspot.com",
  messagingSenderId: "815318165159",
  appId: "1:815318165159:web:14e1d989c06113e0db9d82",
  measurementId: "G-J7RZDH36WN"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;