// John Gibson
// Final Exam:  This project creates a nodejs app that 
let express = require('express');
let app = express();
let path = require('path'); 

// config.js stores many of my environment variables
const config = require('./config'); 
// Pulls in knex object from database.js
const knex = require('./database');
// Const Users = require("./models/users");
let port = config.port

app.set("view engine", "ejs") 
app.set("views", path.join(__dirname, "../frontend/views")) 
app.use(express.urlencoded( {extended: true} ))
app.use('/CSS', express.static(path.join(__dirname, '../frontend/css')));

// landing page

app.get('/', (req, res) => {
    knex('characters')
      .join('planets', 'characters.planet_name', '=', 'planets.id')
      .select(
        'characters.id',
        'characters.last_name',
        'characters.first_name',
        'planets.planet_name',
        'characters.jedi',
        'characters.weapon',
      )
      .orderBy('characters.last_name', 'asc')
      .orderBy('characters.first_name', 'asc')
      .then(starwars => {
        // Render the index.ejs template and pass the data
        res.render('index', { starwars });
      })
      .catch(error => {
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
      });
  });


  app.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    // Query the Pokémon by ID first
    knex('characters')
      .where('id', id)
      .first()
      .then(character => {
        if (!character) {
          return res.status(404).send('Jedi not found');
        }
        // Query all Pokémon types after fetching the Pokémon
        knex('planets')
          .select('id', 'planet_name')
          .then(planet => {
            // Render the edit form and pass both pokemon and poke_types
            res.render('edit', { character, planet });
          })
          .catch(error => {
            console.error('Error fetching jedi types:', error);
            res.status(500).send('Internal Server Error');
          });
      })
      .catch(error => {
        console.error('Error fetching jedi for editing:', error);
        res.status(500).send('Internal Server Error');
      });
  });
 
  app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const jedi = req.body.jedi === 'true'; 
    const weapon = req.body.weapon;
    const planet = req.body.planet;

    knex('characters')
      .where('id', id)
      .update({
        first_name: first_name,
        last_name: last_name,
        jedi: jedi,
        weapon: weapon,
        planet_name: planet,
      })
      .then(() => {
        res.redirect('/'); // Redirect to the list of Pokémon after saving
      })
      .catch(error => {
        console.error('Error updating Characters:', error);
        res.status(500).send('Internal Server Error');
      });
  });
  
  
  app.get('/add', (req, res) => {
    // Fetch Pokémon types to populate the dropdown
    knex('planets')
      .select('id', 'planet_name')
      .then(planets => {
        // Render the add form with the Pokémon types data
        res.render('add', { planets });
      })
      .catch(error => {
        console.error('Error fetching planets info:', error);
        res.status(500).send('Internal Server Error');
      });
  });



  app.post('/add', (req, res) => {
    // Extract form values from req.body
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const jedi = req.body.jedi === 'true'; 
    const weapon = req.body.weapon;
    const planet = parseInt(req.body.planet_id, 10);
    // Insert the new Pokémon into the database
    console.log(parseInt(planet))
    knex('characters')
      .insert({
        first_name: first_name,
        last_name: last_name,
        jedi: jedi,
        weapon: weapon,
        planet_name: planet,
      })
      .then(() => {
        res.redirect('/'); // Redirect to the Pokémon list page after adding
      })
      .catch(error => {
        console.error('Error adding Character:', error);
        res.status(500).send('Internal Server Error');
      });
  });
  
  app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    knex('characters')
      .where('id', id)
      .del() // Deletes the record with the specified ID
      .then(() => {
        res.redirect('/'); // Redirect to the Pokémon list after deletion
      })
      .catch(error => {
        console.error('Error deleting character:', error);
        res.status(500).send('Internal Server Error');
      });
    });


    app.get('/maintain_planets', (req, res) =>
        {
            res.render('planets')
        });


// app listening
app.listen(port, () => console.log("Express App has started and server is listening!"));

