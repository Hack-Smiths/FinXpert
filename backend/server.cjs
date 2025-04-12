const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/api/users", (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


app.post("/api/users", (req, res) => {
  const { name, email, password } = req.body;
  db.run(
    `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
    [name, email, password],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
