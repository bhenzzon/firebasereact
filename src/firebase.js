import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCpnsQJaQ0OvWmVBWPOlB2iZEEJeHmAq14",
    authDomain: "react-contact-1c99d.firebaseapp.com",
    projectId: "react-contact-1c99d",
    storageBucket: "react-contact-1c99d.appspot.com",
    messagingSenderId: "1008041336731",
    appId: "1:1008041336731:web:f6b857f62a6b69b7fecb3e"
  };
  
  const fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();
  