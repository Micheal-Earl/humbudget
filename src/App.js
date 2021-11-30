import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";
//import * as V from "victory";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import Authentication from "./components/Authentication.js";
import CreateTransaction from "./components/CreateTransaction.js";
import UpdateTransaction from "./components/UpdateTransaction.js";
import DeleteTransaction from "./components/DeleteTransaction.js";

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
        <h1 className="h1">HumBudget</h1>
        <div className="nav text text-lg">
          <Link className="text-blue-500" to="/">
            <b>Home</b>
          </Link>{" "}
          |{" "}
          <Link className="text-blue-500" to="/recommendations">
            Recommendations
          </Link>
        </div>
        <Authentication setSuperUser={setSuperUser} />
        <CreateTransaction
          getTransactions={getTransactions}
          userUID={superUser.uid}
        />
        <div className="grid grid-cols-2 mb-5">
          <ul className="col-span-1 mr-5">
            {transactions.map((transaction) => {
              return (
                <div
                  className="mb-2 max-w-7xl rounded shadow-lg bg-white p-8 mt-3"
                  key={transaction.id}
                >
                  <li>
                    <b>Name:</b> {transaction.name} | <b>Amount:</b> ${" "}
                    {transaction.amount} | <b>Category:</b>{" "}
                    {transaction.category} | <b>Merchant:</b>{" "}
                    {transaction.merchant} | <b>Date:</b> {transaction.date}
                  </li>
                  <li className="flex">
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
                  </li>
                </div>
              );
            })}
          </ul>
          <Graph className="col-auto" transactions={transactions} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1 className="h1">HumBudget</h1>
        <Authentication setSuperUser={setSuperUser} />
      </div>
    );
  }
}

function Graph({ transactions }) {
  // Dummy data for graph
  /*
  const transactions = [
    { date: new Date(2021, 1, 1), amount: 13 },
    { date: new Date(2021, 2, 12), amount: 18 },
    { date: new Date(2021, 3, 17), amount: 8 },
    { date: new Date(2021, 4, 5), amount: 240 },
  ];
  */

  const sortedTransactions = transactions
    .slice()
    .sort((a, b) => b.date - a.date);

  //let transactions = getTransactions();

  return (
    <div className="grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 max-w-full rounded shadow-lg bg-white p-4 mt-3 mr-5">
      <VictoryChart
        className="w-1/2"
        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        domainPadding={20}
        scale={{ x: "time" }}
      >
        <VictoryAxis />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => `$${x}`}
        />
        <VictoryBar data={sortedTransactions} x="date" y="amount" />
      </VictoryChart>
      <VictoryChart className="w-1/2" domainPadding={20}>
        <VictoryAxis />
        <VictoryAxis dependentAxis tickFormat={(x) => `$${x}`} />
        <VictoryBar data={sortedTransactions} x="merchant" y="amount" />
      </VictoryChart>
      <VictoryChart className="w-1/2" domainPadding={20}>
        <VictoryAxis />
        <VictoryAxis dependentAxis tickFormat={(x) => `$${x}`} />
        <VictoryBar data={sortedTransactions} x="category" y="amount" />
      </VictoryChart>
      <VictoryChart className="w-1/2" domainPadding={20}>
        <VictoryAxis />
        <VictoryAxis dependentAxis tickFormat={(x) => `$${x}`} />
        <VictoryBar data={sortedTransactions} x="name" y="amount" />
      </VictoryChart>
    </div>
  );
}

export default App;
