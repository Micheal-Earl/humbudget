import React, { useState } from "react";
import { auth, db } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc } from "@firebase/firestore";
import { Styles } from "../TailwindStyles.js";

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
        <h4 className={Styles.h4}>Currently logged in as: {user?.email}</h4>
        <button className={Styles.buttonRed} onClick={logout}>
          Sign out
        </button>
      </div>
    );
  } else {
    return (
      <div className="Auth">
        <div>
          <h4 className={Styles.h4}>Register new user</h4>
          <input
            className={Styles.input}
            placeholder="Email..."
            onChange={function (event) {
              setRegisterEmail(event.target.value);
            }}
          />
          <input
            className={Styles.input}
            type="password"
            placeholder="Password..."
            onChange={function (event) {
              setRegisterPassword(event.target.value);
            }}
          />

          <button className={Styles.button} onClick={register}>
            Create User
          </button>
        </div>

        <div>
          <h4 className={Styles.h4}>Login</h4>
          <input
            className={Styles.input}
            placeholder="Email..."
            onChange={function (event) {
              setLoginEmail(event.target.value);
            }}
          />
          <input
            className={Styles.input}
            type="password"
            placeholder="Password..."
            onChange={function (event) {
              setLoginPassword(event.target.value);
            }}
          />

          <button className={Styles.button} onClick={login}>
            Sign In
          </button>
        </div>
      </div>
    );
  }
}

export default Authentication;
