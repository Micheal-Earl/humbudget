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
      <h2>Recommendations</h2>
    </main>
  );
}

export default Recommendations;
