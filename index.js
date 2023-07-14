const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Logging requests using Morgan
app.use(morgan('dev'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

const topMovies = [
  // Your top 10 movies data here
];

// GET route for /movies
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

// GET route for /
app.get('/', (req, res) => {
  res.send('Hello, this is the default response!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = 3000; // Replace with your desired port number
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
