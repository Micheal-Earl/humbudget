import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  const pathname = window.location.pathname;
  console.log(pathname);

  if (pathname === "/") {
    return (
      <div>
        <div className="bg-white shadow-sm">
          <div className="container xl">
            <nav className="flex items-center justify-between flex-wrap w-full p-6">
              <div class="flex items-center mr-10">
                <Link to="/">
                  <h1 className="h1">
                    <span className="text-green-600">Hum</span>
                    <span className="text-yellow-400">Budget</span>
                  </h1>
                </Link>
              </div>
              <div class="w-full block flex-grow lg:flex lg:items-right lg:w-auto">
                <div className="nav text text-lg">
                  <Link className="text-yellow-400 text-2xl" to="/">
                    <b>Home</b>
                  </Link>
                  <span className="text-yellow-400 p-4"> | </span>
                  <Link
                    className="text-yellow-400 text-2xl"
                    to="/recommendations"
                  >
                    Recommendations
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="bg-white shadow-sm">
          <div className="container xl">
            <nav className="flex items-center justify-between flex-wrap w-full p-6">
              <div class="flex items-center mr-10">
                <Link to="/">
                  <h1 className="h1">
                    <span className="text-green-600">Hum</span>
                    <span className="text-yellow-400">Budget</span>
                  </h1>
                </Link>
              </div>
              <div class="w-full block flex-grow lg:flex lg:items-right lg:w-auto">
                <div className="nav text text-lg">
                  <Link className="text-yellow-400 text-2xl" to="/">
                    Home
                  </Link>
                  <span className="text-yellow-400 p-4"> | </span>
                  <Link
                    className="text-yellow-400 text-2xl"
                    to="/recommendations"
                  >
                    <b>Recommendations</b>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
