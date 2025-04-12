const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require('./config/db.cjs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/api/users", (req, res) => {
  console.log("GET /api/users request received"); // ADD THIS LINE
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error("Error fetching users:", err); // ADD THIS LINE
      return res.status(500).json({ error: err.message });
    }
    console.log("Users fetched:", rows); // ADD THIS LINE
    res.json(rows);
  });
});

app.post("/api/users", (req, res) => {
  console.log("POST /api/users request received:", req.body); // ADD THIS LINE
  const { name, email, password } = req.body;
  db.run(
    `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
    [name, email, password],
    function (err) {
      if (err) {
        console.error("Error creating user:", err); // ADD THIS LINE
        return res.status(500).json({ error: err.message });
      }
      console.log("User created with ID:", this.lastID); // ADD THIS LINE
      res.json({ id: this.lastID });
    }
  );
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
