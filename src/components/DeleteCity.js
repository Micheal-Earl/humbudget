import React from "react";
import { db } from "../firebase.js";
import { doc, deleteDoc } from "firebase/firestore";

function DeleteCity({ getCities, city }) {
  const deleteCityDoc = async (id) => {
    try {
      const cityDoc = doc(db, "cities", id);
      await deleteDoc(cityDoc);

      // This function is passed down from parent component
      getCities();
    } catch (error) {
      console.log(error.message);
    }
  };

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

export default DeleteCity;
