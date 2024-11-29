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
    knex('pokemon')
      .join('poke_type', 'pokemon.poke_type_id', '=', 'poke_type.id')
      .select(
        'pokemon.id',
        'pokemon.description',
        'pokemon.base_total',
        'pokemon.date_created',
        'pokemon.active_poke',
        'pokemon.gender',
        'pokemon.poke_type_id',
        'poke_type.description as poke_type_description'
      )
      .then(pokemon => {
        // Render the index.ejs template and pass the data
        res.render('index', { pokemon });
      })
      .catch(error => {
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
      });
  });


  app.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    // Query the Pokémon by ID first
    knex('pokemon')
      .where('id', id)
      .first()
      .then(pokemon => {
        if (!pokemon) {
          return res.status(404).send('Pokémon not found');
        }
        // Query all Pokémon types after fetching the Pokémon
        knex('poke_type')
          .select('id', 'description')
          .then(poke_types => {
            // Render the edit form and pass both pokemon and poke_types
            res.render('edit', { pokemon, poke_types });
          })
          .catch(error => {
            console.error('Error fetching Pokémon types:', error);
            res.status(500).send('Internal Server Error');
          });
      })
      .catch(error => {
        console.error('Error fetching Pokémon for editing:', error);
        res.status(500).send('Internal Server Error');
      });
  });

  app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const description = req.body.description;
    const base_total = parseInt(req.body.base_total); 
    const date_created = req.body.date_created;
    const active_poke = req.body.active_poke === 'true'; 
    const gender = req.body.gender;
    const poke_type_id = parseInt(req.body.poke_type_id); 

    knex('pokemon')
      .where('id', id)
      .update({
        description: description,
        base_total: base_total,
        date_created: date_created,
        active_poke: active_poke,
        gender: gender,
        poke_type_id: poke_type_id,
      })
      .then(() => {
        res.redirect('/'); // Redirect to the list of Pokémon after saving
      })
      .catch(error => {
        console.error('Error updating Pokémon:', error);
        res.status(500).send('Internal Server Error');
      });
  });
  
  
  app.get('/add', (req, res) => {
    // Fetch Pokémon types to populate the dropdown
    knex('poke_type')
      .select('id', 'description')
      .then(poke_types => {
        // Render the add form with the Pokémon types data
        res.render('add', { poke_types });
      })
      .catch(error => {
        console.error('Error fetching Pokémon types:', error);
        res.status(500).send('Internal Server Error');
      });
  });

  app.get('/view/:id', (req, res) => {
    const id = req.params.id;
    knex('pokemon').where('id', id).first().then((pokemon) => {
    res.render('display', {pokemon}); // Redirect to the Pokémon list after deletion
      })
  })
  
  
  app.post('/add', (req, res) => {
    // Extract form values from req.body
    const description = req.body.description || ''; // Default to empty string if not provided
    const base_total = parseInt(req.body.base_total, 10); // Convert to integer
    const date_created = req.body.date_created || new Date().toISOString().split('T')[0]; // Default to today
    const active_poke = req.body.active_poke === 'true'; // Checkbox returns true or undefined
    const gender = req.body.gender || 'U'; // Default to 'U' for Unknown
    const poke_type_id = parseInt(req.body.poke_type_id, 10); // Convert to integer
    // Insert the new Pokémon into the database
    knex('pokemon')
      .insert({
        description: description.toUpperCase(), // Ensure description is uppercase
        base_total: base_total,
        date_created: date_created,
        active_poke: active_poke,
        gender: gender,
        poke_type_id: poke_type_id,
      })
      .then(() => {
        res.redirect('/'); // Redirect to the Pokémon list page after adding
      })
      .catch(error => {
        console.error('Error adding Pokémon:', error);
        res.status(500).send('Internal Server Error');
      });
  });
  
  app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    knex('pokemon')
      .where('id', id)
      .del() // Deletes the record with the specified ID
      .then(() => {
        res.redirect('/'); // Redirect to the Pokémon list after deletion
      })
      .catch(error => {
        console.error('Error deleting Pokémon:', error);
        res.status(500).send('Internal Server Error');
      });
    });


// app listening
app.listen(port, () => console.log("Express App has started and server is listening!"));
