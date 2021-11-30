import { Link } from "react-router-dom";

function Recommendations() {
  return (
    <main style={{ padding: "0 50px" }}>
      <h1 className="h1">HumBudget</h1>
      <div className="nav text text-lg">
        <Link className="text-blue-500" to="/">
          Home
        </Link>{" "}
        |{" "}
        <Link className="text-blue-500" to="/recommendations">
          <b>Recommendations</b>
        </Link>
      </div>
      <div className="rec max-w-xl rounded shadow-lg bg-white p-8 m-3">
        <h3 className="h3">Rita’s Margaritas &amp; Mexican Grill</h3>
        <p>
          If you are craving Mexican food, then look no further. Rita’s
          Margaritas is a local chain that serves delicious Mexican dishes and
          various alcoholic beverages, all for fair prices.
        </p>
        <p>5/5</p>
      </div>
      <div className="rec max-w-xl rounded shadow-lg bg-white p-8 m-3">
        <h3 className="h3">Stars Hamburgers</h3>
        <p>
          A cozy burger joint dedicated to serving grass fed burgers and other
          sandwiches, along with milkshakes.
        </p>
        <p>5/5</p>
      </div>
      <div className="rec max-w-xl rounded shadow-lg bg-white p-8 m-3">
        <h3 className="h3">Japhy’s Soup and Noodles</h3>
        <p>
          A restaurant that serves authentic Japanese - style soups and noodles,
          with a selection of fresh, homemade soups that changes daily.
        </p>
        <p>4.5/5</p>
      </div>
      <div className="rec max-w-xl rounded shadow-lg bg-white p-8 m-3">
        <h3 className="h3">Slice of Humboldt Pie</h3>
        <p>
          Pie shop that offers an assortment of savory, freshly baked pies and
          provides vegetarian, vegan and gluten free options.
        </p>
        <p>4.5/5</p>
      </div>
      <div className="rec max-w-xl rounded shadow-lg bg-white p-8 m-3">
        <h3 className="h3">Cafe Brio</h3>
        <p>
          A small cafe that offers a wide variety of delicious baked goods and
          serves artisanal coffees and local wines.
        </p>
        <p>4/5</p>
      </div>
    </main>
  );
}

export default Recommendations;
