import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import { initializeApp } from "firebase/app";
import { initializeAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC2B7qHjCFzv1Aq5kfjIbIe_psLG35iskc",
  authDomain: "personal-website-6a2a9.firebaseapp.com",
  databaseURL: "https://personal-website-6a2a9.firebaseio.com",
  projectId: "personal-website-6a2a9",
  storageBucket: "personal-website-6a2a9.appspot.com",
  messagingSenderId: "280241671766",
  appId: "1:280241671766:web:bc863440cededa05f075f7",
  measurementId: "G-H7KL5J0KG8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAnalytics(app);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
