const express = require("express");
const mysql = require("mysql2");
const cors = require("cors")
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors())
const db = mysql.createConnection({
  host: "localhost",
  user: "root",      
  password: "",
  database: "todo-app"
});
db.connect()

app.post("/api/authenticate", (req, res) => {
    const query = "SELECT * FROM users WHERE username = ?"
    db.query(query, [req.body.username], (err, result) => {
      if (err) {
        res.status(500)
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          db.query("INSERT INTO users (username) VALUES (?)", [req.body.username], (err, result) => {
            if (err) {
              res.status(500)
            } else {
              res.status(201).json({ id: result.insertId, username: req.body.username })
            }
          })
        }
      }
    })
})

app.get("/api/:userId/todos", (req, res) => {
  const query = "SELECT * FROM todos WHERE user_id = ?";
  db.query(query, [req.params.userId], (err, result) => {
    if (err) {
      res.status(500)
    } else {
      res.status(200).json(result);
    }
  })
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
