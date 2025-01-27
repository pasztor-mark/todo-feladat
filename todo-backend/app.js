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
app.post("/api/:userId/todos", (req, res) => {
    const query = "INSERT INTO todos (user_id, title, description, due_date, priority, status) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [req.params.userId, req.body.title, req.body.description, req.body.due_date, req.body.priority, req.body.status], (err, result) => {
      if (err) {
        res.status(500)
      } else {
        res.status(201).json({ id: result.insertId, user_id: req.params.userId, title: req.body.title, description: req.body.description, due_date: req.body.due_date, priority: req.body.priority, status: req.body.status });
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
app.delete("/api/:userId/todos/:todoId", (req, res) => {
  const query = "DELETE FROM todos WHERE user_id = ? AND id = ?";
  db.query(query, [req.params.userId, req.params.todoId], (err, result) => {
    if (err) {
      res.status(500)
    } else {
      res.status(204).send();
    }
  })
})
app.put("/api/:userId/todos/:todoId", (req, res) => {
  const query = "UPDATE todos SET status = ? WHERE user_id = ? AND id = ?";
  db.query(query, [req.body.status, req.params.userId, req.params.todoId], (err, result) => {
    if (err) {
      res.status(500)
    } else {
      res.status(200).json({ status: req.body.status });
    }
  })
})
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
