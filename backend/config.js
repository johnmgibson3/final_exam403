require('dotenv').config(); 

module.exports = {
    port: process.env.PORT || 5001,
    db: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'johnmgibson',
      password: process.env.DB_PASSWORD || 'joost293',
      name: process.env.DB_NAME || 'starwars',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
    },
  };
