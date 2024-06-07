import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAXo2XTuBY_MfR06ZlwT01ewXFTdy-Hmto",
    authDomain: "multi-step-form-d163d.firebaseapp.com",
    projectId: "multi-step-form-d163d",
    storageBucket: "multi-step-form-d163d.appspot.com",
    messagingSenderId: "240596635222",
    appId: "1:240596635222:web:e16eae9b513204896cb5f7",
    measurementId: "G-3RBE6ZY9WY"
  };

  

  const app = initializeApp(firebaseConfig);
//   const db = getFirestore(app);

  export const db = getFirestore(app);