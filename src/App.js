import React, { useState, useEffect } from "react";
import { db } from "./firebase.js";
import Authentication from "./components/Authentication.js";
import CreateCity from "./components/CreateCity.js";
import UpdateCity from "./components/UpdateCity.js";
import DeleteCity from "./components/DeleteCity.js";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";

const citiesCollectionRef = collection(db, "cities");

function App() {
  const [cities, setCities] = useState([]);

  const getCities = async () => {
    const data = await getDocs(citiesCollectionRef);
    setCities(
      data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  };

  useEffect(function () {
    getCities();
  }, []);

  return (
    <div className="App">
      <h1>Test App</h1>
      <Authentication />
      <CreateCity getCities={getCities} />
      <ul>
        {cities.map((city) => {
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

export default App;
