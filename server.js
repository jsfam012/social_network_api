// Imporst express
const express = require('express');

// Create App variable
const app = express();

// Create PORT variable 
const PORT = process.env.PORT || 3333;

// Import mongoose connection
const connection = require('./config/connection');

// Require pi_routes router
// const { api_routes } = require('./routes');

// Open Middleware channel for json
app.use(express.json());

// Load Routes
app.use('/api', [
  api_routes
]);

//Use the connection 'on' method to wait until the database connection has established before runnin gyour app.listen
connection.on('open', () => {
  app.listen(PORT, () => console.log('Server started on port', PORT));
});