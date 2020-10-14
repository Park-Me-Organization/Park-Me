import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBg4RHnJAGKRxZbuyAxjJEmZ6N8d2mvPY0",
    authDomain: "park-me-web.firebaseapp.com",
    databaseURL: "https://park-me-web.firebaseio.com",
    projectId: "park-me-web",
    storageBucket: "park-me-web.appspot.com",
    messagingSenderId: "696794983879",
    appId: "1:696794983879:web:da7fd98f906dfc77637de2",
    measurementId: "G-FEXGBWQGEY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export default firebase;