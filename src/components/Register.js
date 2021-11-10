import React, { useState } from "react";
import { auth, db } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc } from "@firebase/firestore";

function Authentication({ setSuperUser }) {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, function (currentUser) {
    setUser(currentUser);

    // move the user object to the parent component
    setSuperUser(currentUser);
  });

  async function register() {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      ).then(function (userCredential) {
        // Place the new user into the database as a new user document
        setDoc(doc(db, "users", userCredential.user.uid), {
          email: registerEmail,
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async function login() {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function logout() {
    await signOut(auth);
  }

  // Only display register/login if user is not already logged in
  if (user != null) {
    return (
      <div className="Auth">
        <h4>Currently logged in: {user?.email}</h4>
        <button onClick={logout}>Sign out</button>
      </div>
    );
  } else {
    return (
      <div className="Auth">
        <div>
          <h3>Register new user</h3>
          <input
            placeholder="Email..."
            onChange={function (event) {
              setRegisterEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password..."
            onChange={function (event) {
              setRegisterPassword(event.target.value);
            }}
          />
          <div class="flex items-center justify-between">
            <button onClick={register}>Create User</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Authentication;
