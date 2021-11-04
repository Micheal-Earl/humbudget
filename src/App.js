import React, { useState, useEffect } from "react";
import { db } from "./firebase.js";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
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
      <CreateCity getCities={getCities} />
      <ul>
        {cities.map(function (city) {
          return (
            <div>
              <hr></hr>
              <li>Name: {city.name} </li>
              <li>Population: {city.population} </li>
              <li>ID: {city.id} </li>
              <UpdateCity getCities={getCities} city={city} />
              <DeleteCity getCities={getCities} city={city} />
            </div>
          );
        })}
      </ul>
    </div>
  );
}

function CreateCity({ getCities }) {
  const [newCity, setNewCity] = useState("");
  const [newPopulation, setNewPopulation] = useState(0);

  async function createCityDoc() {
    await addDoc(citiesCollectionRef, {
      name: newCity,
      population: Number(newPopulation),
    });

    // This function is passed down from parent component
    getCities();
  }

  return (
    <div>
      <h2>Add a new city</h2>
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
      <button onClick={createCityDoc}> Add City </button>
    </div>
  );
}

function UpdateCity({ getCities, city }) {
  async function updateCityDoc(id, population) {
    const cityDoc = doc(db, "cities", id);
    const newFields = { population: population + 1 };
    await updateDoc(cityDoc, newFields);

    // This function is passed down from parent component
    getCities();
  }

  return (
    <div>
      <button
        onClick={function () {
          updateCityDoc(city.id, city.population);
        }}
      >
        Increment Population
      </button>
    </div>
  );
}

function DeleteCity({ getCities, city }) {
  async function deleteCityDoc(id) {
    const cityDoc = doc(db, "cities", id);
    await deleteDoc(cityDoc);

    // This function is passed down from parent component
    getCities();
  }

  return (
    <div>
      <button
        onClick={function () {
          deleteCityDoc(city.id);
        }}
      >
        Delete City
      </button>
    </div>
  );
}

export default App;
