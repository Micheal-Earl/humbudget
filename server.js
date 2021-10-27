const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

// axios request

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
