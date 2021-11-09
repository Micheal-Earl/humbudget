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

  // This state is my janky solution for passing data up to the parent component from
  // the Authentication component. We can easily pass user state down to other child
  // components with this variable.
  const [superUser, setSuperUser] = useState(null);

  async function getTransactions() {
    // Do not attempt to get user specific collection is user is not logged in
    if (superUser === null) return;

    // Get the specific transaction sub collection as relating to the user
    const usersCollectionRef = collection(
      db,
      "users/" + superUser.uid + "/transactions"
    );

    // Get the documents in our users transaction collection
    const userData = await getDocs(usersCollectionRef);
    setTransactions(
      userData.docs.map((doc) => {
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

  // Check if user is active, if so display relevant transactions
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
