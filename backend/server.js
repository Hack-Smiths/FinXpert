const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();

const connectDB = require("./config/db");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", require("./routes/userRoutes"));

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});