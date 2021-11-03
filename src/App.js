import React, { useState, useEffect } from "react";
import { db } from "./firebase.js";
import { collection, getDocs, addDoc } from "firebase/firestore";
import "./App.css";

const citiesCollectionRef = collection(db, "cities");

function App() {
  const [cities, setCities] = useState([]);

  async function getCities() {
    const data = await getDocs(citiesCollectionRef);
    setCities(
      data.docs.map(function (doc) {
        return { ...doc.data(), id: doc.id };
      })
    );
  }

  useEffect(function () {
    getCities();
  }, []);

  return (
    <div className="App">
      <h1>Test App</h1>
      <AddCity getCities={getCities} />
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

function AddCity({ getCities }) {
  const [newCity, setNewCity] = useState("");
  const [newPopulation, setNewPopulation] = useState(0);

  async function createCity() {
    await addDoc(citiesCollectionRef, {
      name: newCity,
      population: newPopulation,
    });

    // This function is passed down from parent component
    getCities();
  }

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
