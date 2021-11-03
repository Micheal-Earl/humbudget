import React, { useState, useEffect } from "react";
import { db } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";

function App() {
  const [cities, setCities] = useState([]);
  const citiesCollectionRef = collection(db, "cities");

  useEffect(() => {
    async function getCities() {
      const data = await getDocs(citiesCollectionRef);
      setCities(
        data.docs.map(function (doc) {
          return { ...doc.data(), id: doc.id };
        })
      );
    }

    getCities();
  }, []);

  return (
    <div className="App">
      <h1>Test App</h1>
      <AddCity />
      <ul>
        {cities.map(function (city) {
          return (
            <div>
              <hr></hr>
              <li>Name: {city.name} </li>
              <li>Population: {city.population} </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

function AddCity() {
  const [newCity, setNewCity] = useState("");
  const [newPopulation, setNewPopulation] = useState(0);

  async function createCity() {}

  return (
    <div>
      <input
        placeholder="City Name..."
        onChange={function (event) {
          setNewCity(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Population..."
        onChange={function (event) {
          setNewPopulation(event.target.value);
        }}
      />
      <button onClick={createCity}> Add City </button>
    </div>
  );
}

export default App;
