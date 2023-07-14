const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Logging requests using Morgan
app.use(morgan('dev'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

const topMovies = [
    {
      title: 'Iron Man',
      year: 2008,
      director: 'Jon Favreau'
    },
    {
      title: 'Captain America: The Winter Soldier',
      year: 2014,
      director: 'Anthony Russo, Joe Russo'
    },
    {
      title: 'Guardians of the Galaxy',
      year: 2014,
      director: 'James Gunn'
    },
    {
      title: 'Avengers: Infinity War',
      year: 2018,
      director: 'Anthony Russo, Joe Russo'
    },
    {
      title: 'Black Panther',
      year: 2018,
      director: 'Ryan Coogler'
    },
    {
      title: 'Thor: Ragnarok',
      year: 2017,
      director: 'Taika Waititi'
    },
    {
      title: 'Spider-Man: Homecoming',
      year: 2017,
      director: 'Jon Watts'
    },
    {
      title: 'Captain Marvel',
      year: 2019,
      director: 'Anna Boden, Ryan Fleck'
    },
    {
      title: 'Doctor Strange',
      year: 2016,
      director: 'Scott Derrickson'
    },
    {
      title: 'Avengers: Endgame',
      year: 2019,
      director: 'Anthony Russo, Joe Russo'
    }
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
