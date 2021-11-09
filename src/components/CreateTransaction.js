import React, { useState } from "react";
import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";

function CreateTransaction({ getTransactions, userUID }) {
  const [name, setName] = useState("Default Name");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("Default Category");
  const [merchant, setMerchant] = useState("Default Merchant");
  const [date, setDate] = useState(null);

  async function createTransactionDoc() {
    const usersCollectionRef = collection(
      db,
      "users/" + userUID + "/transactions"
    );

    await addDoc(usersCollectionRef, {
      name: name,
      amount: Number(amount),
      category: category,
      merchant: merchant,
      date: date,
    });

    // This function is passed down from parent component
    getTransactions();
  }

  return (
    <div>
      <h2>Add a new transaction</h2>
      <input
        placeholder="Name..."
        onChange={function (event) {
          setName(event.target.value);
        }}
      />
      <input
        placeholder="Amount..."
        type="number"
        onChange={function (event) {
          setAmount(event.target.value);
        }}
      />
      <input
        placeholder="Category..."
        onChange={function (event) {
          setCategory(event.target.value);
        }}
      />
      <input
        placeholder="Merchant..."
        onChange={function (event) {
          setMerchant(event.target.value);
        }}
      />
      <input
        placeholder="Date..."
        type="date"
        onChange={function (event) {
          setDate(event.target.value);
        }}
      />
      <button onClick={createTransactionDoc}> Add Transaction </button>
    </div>
  );
}

export default CreateTransaction;
