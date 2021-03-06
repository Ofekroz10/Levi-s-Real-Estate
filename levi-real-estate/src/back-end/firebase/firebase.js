"use strict";
exports.__esModule = true;
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");
// Add the Firebase services that you want to use
require("firebase/auth");
require("firebase/firestore");
// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
    apiKey: "AIzaSyD-GgiLARgnloxM3gNmTz_H9lxWKGtXW50",
    authDomain: "levi-real-estate.firebaseapp.com",
    databaseURL: "https://levi-real-estate.firebaseio.com",
    projectId: "levi-real-estate",
    storageBucket: "levi-real-estate.appspot.com",
    messagingSenderId: "858866945110",
    appId: "1:858866945110:web:ed5b3d6c76cf370c7d3ff7",
    measurementId: "G-9E237Y00VF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
exports["default"] = firebase;
