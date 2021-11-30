import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Recommendations from "./routes/recommendations";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="recommendations" element={<Recommendations />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
