import React, { useState } from "react";
import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";

const citiesCollectionRef = collection(db, "cities");

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

export default CreateCity;
