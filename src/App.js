import React, { useState, useEffect } from "react";
import { db } from "./firebase.js";
import Authentication from "./components/Authentication.js";
import CreateTransaction from "./components/CreateTransaction.js";
import UpdateTransaction from "./components/UpdateTransaction.js";
import DeleteTransaction from "./components/DeleteTransaction.js";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [superUser, setSuperUser] = useState(null);

  async function getTransactions() {
    // Do not attempt to get user specific collection is user is not logged in
    if (superUser === null) return;

    // Get the specific transaction sub collection as relating to the user
    const usersCollectionRef = collection(
      db,
      "users/" + superUser.uid + "/transactions"
    );
    const userData = await getDocs(usersCollectionRef);
    setTransactions(
      userData.docs.map((doc) => {
        console.log(doc);
        return { ...doc.data(), id: doc.id };
      })
    );
  }

  // Get transactions if our user updates or changes
  useEffect(
    function () {
      if (superUser) {
        getTransactions();
      }
    },
    [superUser]
  );

  if (superUser != null) {
    return (
      <div className="App">
        <h1>Humbudget</h1>
        <Authentication setSuperUser={setSuperUser} />
        <CreateTransaction
          getTransactions={getTransactions}
          userUID={superUser.uid}
        />

        <ul>
          {transactions.map((transaction) => {
            return (
              <div key={transaction.id}>
                <hr></hr>
                <li>
                  <b>Transaction ID:</b> {transaction.id}
                </li>
                <li>
                  <b>Transaction Name:</b> {transaction.name}
                </li>
                <li>
                  <b>Transaction Amount:</b> {transaction.amount}
                </li>
                <li>
                  <b>Transaction Category:</b> {transaction.category}
                </li>
                <li>
                  <b>Transaction Merchant:</b> {transaction.merchant}
                </li>
                <li>
                  <b>Transaction Date:</b> {transaction.date}
                </li>
                <UpdateTransaction
                  getTransactions={getTransactions}
                  transaction={transaction}
                  userUID={superUser.uid}
                />
                <DeleteTransaction
                  getTransactions={getTransactions}
                  transaction={transaction}
                  userUID={superUser.uid}
                />
              </div>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Humbudget</h1>
        <Authentication setSuperUser={setSuperUser} />
      </div>
    );
  }
}

export default App;
