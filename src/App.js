import React, { useState, useEffect } from "react";
import { db } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";

function App() {
  const [cities, setCities] = useState([]);
  const citiesCollectionRef = collection(db, "cities");

  useEffect(() => {
    async function getUsers() {
      const data = await getDocs(citiesCollectionRef);
      setCities(
        data.docs.map(function (doc) {
          return { ...doc.data(), id: doc.id };
        })
      );
    }

    getUsers();
  }, []);

  return (
    <div className="App">
      <h1>Firebase Test App wee</h1>
      <ul>
        {cities.map(function (city) {
          return (
            <div>
              <li>Name: {city.name} </li>
              <li>Population: {city.population} </li>
              <hr></hr>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
