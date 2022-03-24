"use strict";

var firebaseConfig = {
  apiKey: "AIzaSyAeieTzFfYsNztlc_tN8ofhAcEBW3g5OLc",
  authDomain: "clevercoderjoy-a-clone-28b08.firebaseapp.com",
  projectId: "clevercoderjoy-a-clone-28b08",
  storageBucket: "clevercoderjoy-a-clone-28b08.appspot.com",
  messagingSenderId: "182374097874",
  appId: "1:182374097874:web:79f49817044ae164fe5e0b",
  measurementId: "G-XRQH61V256"
}; // Initialize Firebase

firebase.initializeApp(firebaseConfig); // Initialize Cloud Firestore and get a reference to the service

var db = firebase.firestore();