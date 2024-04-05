require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
app.use( cors() );
app.use( express.json() )
app.use('/backend/user', require('./routes/usuarios'));

app.listen(PORT);
console.log('API escuchando en el puerto ' + PORT);