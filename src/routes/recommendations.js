import { Link } from "react-router-dom";
import Restaurants from "../components/Restaurants";
import Navigation from "../components/Navigation.js";

function Recommendations() {
  return (
    <div>
      <Navigation />
      <Restaurants />
    </div>
  );
}

export default Recommendations;
