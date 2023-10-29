/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyn-EU5XL1ZKgv8PXqp6rXD3PoNYy-2hs",
  authDomain: "hng-stage3-project.firebaseapp.com",
  projectId: "hng-stage3-project",
  storageBucket: "hng-stage3-project.appspot.com",
  messagingSenderId: "637349643104",
  appId: "1:637349643104:web:aa995dc56d61e055109405",
};

//initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize Firebase Auth and get a reference to the service
export const auth = getAuth(app);
