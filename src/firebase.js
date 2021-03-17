import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC6ILQOxpgvMQ-faLhmN-rgEfYaoJvmssU",
    authDomain: "bt3103-week-6-8d768.firebaseapp.com",
    projectId: "bt3103-week-6-8d768",
    storageBucket: "bt3103-week-6-8d768.appspot.com",
    messagingSenderId: "651146359724",
    appId: "1:651146359724:web:9aaa17d49dd1701aca4009",
    measurementId: "G-5XXQR52P3N",
};

// Initialize and exporting firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
