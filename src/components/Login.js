import React, { useState } from "react";
import { auth, db } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc } from "@firebase/firestore";

function Login({ setSuperUser }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, function (currentUser) {
    setUser(currentUser);

    // move the user object to the parent component
    setSuperUser(currentUser);
  });

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
      <div class="flex justify-center">
        <div class="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                class="block text-grey-darker text-sm font-bold mb-2"
                for="username"
              >
                Email
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                type="email"
                placeholder="Email..."
                onChange={function (event) {
                  setLoginEmail(event.target.value);
                }}
              />
            </div>
            <div className="mb-6">
              <label
                class="block text-grey-darker text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="***************"
                onChange={function (event) {
                  setLoginPassword(event.target.value);
                }}
              />
            </div>
            <div class="flex items-center justify-between">
              <button class="auth-button" onClick={login}>
                Sign In
              </button>
              <a
                class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
