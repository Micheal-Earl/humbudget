import React from "react";
import { db } from "../firebase.js";
import { doc, deleteDoc } from "firebase/firestore";

function DeleteTransaction({ getTransactions, transaction, userUID }) {
  async function deleteTransactionDoc(id) {
    try {
      const transactionDoc = doc(db, "users/" + userUID + "/transactions", id);
      await deleteDoc(transactionDoc);

      // This function is passed down from parent component
      getTransactions();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <button
        className="buttonSmallRed mr-1 w-16"
        onClick={function () {
          deleteTransactionDoc(transaction.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteTransaction;
