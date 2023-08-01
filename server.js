const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: "Kim",
    favoriteMovies: []
  },
  {
    id: 2,
    name: "Joe",
    favoriteMovies: ["The Fountain"]
  },
];

let movies = [
    {
      "Title": "Iron Man",
      "Director": "Jon Favreau",
      "Genre": "Action, Adventure, Sci-Fi",
      "Description": "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil as Iron Man."
    },
    {
      "Title": "Captain America: The Winter Soldier",
      "Director": "Anthony Russo, Joe Russo",
      "Genre": "Action, Adventure, Sci-Fi",
      "Description": "Steve Rogers, the super-soldier Captain America, teams up with Black Widow and Falcon to uncover a conspiracy within S.H.I.E.L.D. while facing a powerful new enemy, the Winter Soldier."
    },
    {
      "Title": "Guardians of the Galaxy",
      "Director": "James Gunn",
      "Genre": "Action, Adventure, Comedy",
      "Description": "A group of intergalactic criminals - Star-Lord, Gamora, Drax the Destroyer, Rocket Raccoon, and Groot - become unlikely heroes to stop the villainous Ronan from using a powerful orb for destruction."
    },
  ];
  

//READ
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
})

// READ
app.get('/movies/:title', (req,res) => {
    const { title } = req.params;
    const movie = movies.find (movie => movie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie')
    }

})

app.listen(8080, () => console.log("listening on 8080"));
