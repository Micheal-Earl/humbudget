import React, { useState } from "react";
import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { Styles } from "../TailwindStyles.js";

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

  // Tailwind styles, this is probably a bad way to do this

  return (
    <div className="create-transaction mb-5">
      <h2 className={Styles.h2}>Add a new transaction</h2>
      <input
        className={Styles.input}
        placeholder="Name..."
        onChange={function (event) {
          setName(event.target.value);
        }}
      />
      <input
        className={Styles.input}
        placeholder="Amount..."
        type="number"
        onChange={function (event) {
          setAmount(event.target.value);
        }}
      />
      <input
        className={Styles.input}
        placeholder="Category..."
        onChange={function (event) {
          setCategory(event.target.value);
        }}
      />
      <input
        className={Styles.input}
        placeholder="Merchant..."
        onChange={function (event) {
          setMerchant(event.target.value);
        }}
      />
      <input
        className={Styles.input}
        type="date"
        onChange={function (event) {
          setDate(event.target.value);
        }}
      />
      <button className={Styles.button} onClick={createTransactionDoc}>
        Add Transaction
      </button>
    </div>
  );
}

export default CreateTransaction;
