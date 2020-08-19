import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBR0I8khr5BaxP6F5s48riNo81gS1R1wuo",
    authDomain: "working-hours-lucy.firebaseapp.com",
    databaseURL: "https://working-hours-lucy.firebaseio.com",
    projectId: "working-hours-lucy",
    storageBucket: "working-hours-lucy.appspot.com",
    messagingSenderId: "60595916202",
    appId: "1:60595916202:web:5c3a71b46e69a35a716fd3"
  };

  // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default app ;