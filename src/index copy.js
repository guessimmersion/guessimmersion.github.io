const express = require('express');
const mysql = require('mysql'); // or use any database client like pg for PostgreSQL
const app = express();

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'matches'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// API endpoint to fetch match_id from the Andrey table
app.get('/api/match_id', (req, res) => {
  const sql = 'SELECT match_id FROM Andrey';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Start the server
app.listen(2888, () => {
  console.log('Server started on port 5000');
});
