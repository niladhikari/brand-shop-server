const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Crud is running ....");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
