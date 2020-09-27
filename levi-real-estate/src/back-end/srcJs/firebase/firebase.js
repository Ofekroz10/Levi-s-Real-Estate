"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebase = void 0;
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase1 = __importStar(require("firebase/app"));
require('firebase/database');
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
firebase1.initializeApp(firebaseConfig);
exports.firebase = firebase1.database();
