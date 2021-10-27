import React, { useState, useEffect } from "react";

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA4Hik6UPP1QSrlty33pYFhLEBT3TLihjM",
  authDomain: "humbudget.firebaseapp.com",
  projectId: "humbudget",
  storageBucket: "humbudget.appspot.com",
  messagingSenderId: "325490290430",
  appId: "1:325490290430:web:7a878bd66f4298d15e7faf",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

const App = () => {
  //const [load, setLoad] = useState(false);
  const [cityList, setCityList] = useState({});
  //setLoad(false);

  async function getCities(db) {
    const citiesCol = collection(db, "cities");
    const citySnapshot = await getDocs(citiesCol);
    const cityObj = citySnapshot.docs.map((doc) => doc.data());
    setCityList(cityObj);
  }

  useEffect(() => {
    getCities(db);
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      <p>{JSON.stringify(cityList)}</p>
    </div>
  );
};

export default App;
