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
    favoriteMovies: ["Iron Man"]
  },
];

let movies = [
  {
    "Title": "Iron Man",
    "Director": {
      "Name": "Jon Favreau",
      "Bio": "Jon Favreau is an American actor, director, and producer known for his work in both independent and blockbuster films. He gained widespread recognition for directing 'Iron Man' and helping launch the Marvel Cinematic Universe."
    },
    "Genre": {
      "Name": "Action",
      "Description": "This genre typically features thrilling action sequences, adventurous plots, and futuristic or science fiction elements. It often involves heroes facing powerful adversaries in high-stakes scenarios."
    },
    "Description": "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil as Iron Man."
  },
  {
    "Title": "Captain America: The Winter Soldier",
    "Director": {
      "Name": "Anthony Russo, Joe Russo",
      "Bio": "Anthony and Joe Russo, commonly known as the Russo Brothers, are American film and television directors. They are best known for their work in the Marvel Cinematic Universe, including 'Captain America: The Winter Soldier.'"
    },
    "Genre": {
      "Name": "Adventure",
      "Description": "The adventure genre takes audiences on thrilling journeys filled with excitement, danger, and exploration in distant and captivating worlds."
    },
    "Description": "Steve Rogers, the super-soldier Captain America, teams up with Black Widow and Falcon to uncover a conspiracy within S.H.I.E.L.D. while facing a powerful new enemy, the Winter Soldier."
  },
  {
    "Title": "Guardians of the Galaxy",
    "Director": {
      "Name": "James Gunn",
      "Bio": "James Gunn is an American filmmaker, actor, and screenwriter known for his work in the superhero genre. He is acclaimed for directing 'Guardians of the Galaxy' and its sequel."
    },
    "Genre": {
      "Name": "Comedy",
      "Description": "The comedy genre uses humor, wit, and clever storytelling to entertain and provoke laughter in its audience."
    },
    "Description": "A group of intergalactic criminals - Star-Lord, Gamora, Drax the Destroyer, Rocket Raccoon, and Groot - become unlikely heroes to stop the villainous Ronan from using a powerful orb for destruction."
  },
];

// CREATE
app.post('/users', (req, res) => {
  const newUser = req.body;
  
  if (newUser.name) {
      newUser.id = uuid.v4();
      users.push(newUser);
      res.status(201).json(newUser)
  } else {
    res.status(400).send('users need names')
  }

})


// UPDATE
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  
  let user = users.find( user => user.id == id );

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('no such user')
  }
})

// CREATE
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
  
  let user = users.find( user => user.id == id );

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);;
  } else {
    res.status(400).send('no such user')
  }
})

// DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
  
  let user = users.find( user => user.id == id );

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);;
  } else {
    res.status(400).send('no such user')
  }
})

// DELETE
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find( user => user.id ==id );

  if (user) {
    users = users.filter( user => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send('no such user')
  }
})

  

//READ
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
})

// READ
app.get('/movies/:title', (req, res) => {
    const { title } = req.params; 
    const movie = movies.find( movie => movie.Title === title);
  
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).send('No such movie');
    }
  });  

// READ
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params; 
  const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(404).send('No such genre');
  }
});    

// READ
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params; 
  const director = movies.find( movie => movie.Director.Name === directorName ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(404).send('No such director');
  }
});  

app.listen(8080, () => console.log("listening on 8080"));
