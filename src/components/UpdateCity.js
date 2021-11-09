import React from "react";
import { db } from "../firebase.js";
import { doc, updateDoc } from "firebase/firestore";

function UpdateCity({ getCities, city }) {
  async function updateCityDoc(id, population) {
    try {
      const cityDoc = doc(db, "cities", id);
      const newFields = { population: population + 1 };
      await updateDoc(cityDoc, newFields);

      // This function is passed down from parent component
      getCities();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <button
        onClick={() => {
          updateCityDoc(city.id, city.population);
        }}
      >
        Increment Population
      </button>
    </div>
  );
}

export default UpdateCity;
