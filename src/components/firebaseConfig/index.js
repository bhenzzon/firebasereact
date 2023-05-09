import {initializeApp} from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
function StartFirebase(){
const firebaseConfig = {
    apiKey: "AIzaSyCpnsQJaQ0OvWmVBWPOlB2iZEEJeHmAq14",
    authDomain: "react-contact-1c99d.firebaseapp.com",
    databaseURL: "https://react-contact-1c99d-default-rtdb.firebaseio.com",
    projectId: "react-contact-1c99d",
    storageBucket: "react-contact-1c99d.appspot.com",
    messagingSenderId: "1008041336731",
    appId: "1:1008041336731:web:f6b857f62a6b69b7fecb3e"
  }
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}

export default StartFirebase;