//Modules ---
const express = require('express');
const sharp = require('sharp');
const app = express();

const PORT = 3000;

//Routes ---
app.get('/', function (req, res) {
  res.send('Hello World!');
});

//Open Service ---
app.listen(PORT, function () {
  console.log('Opened Service on Port: ' + PORT);
}); 