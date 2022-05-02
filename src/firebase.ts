import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);

export { analytics };
