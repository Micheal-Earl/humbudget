import React from "react";
import { db } from "../firebase.js";
import { doc, updateDoc } from "firebase/firestore";

function UpdateTransaction({ getTransactions, transaction, userUID }) {
  async function updateCityDoc(id, amount) {
    try {
      const transactionDoc = doc(db, "users/" + userUID + "/transactions", id);
      const newFields = { amount: amount + 1 };
      await updateDoc(transactionDoc, newFields);

      // This function is passed down from parent component
      getTransactions();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <button
        onClick={() => {
          updateCityDoc(transaction.id, transaction.amount);
        }}
      >
        Increment Amount
      </button>
    </div>
  );
}

export default UpdateTransaction;
