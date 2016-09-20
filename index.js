/*
 * Module dependencies
 */

import express from 'express';
import http from 'http';
import engine from 'socket.io';
import dbapi from './db-api';

const port = 3000;
const app = express();

// Configure static files route
app.use('/', express.static(__dirname + '/public'));

app.get('/pokemons', (req, res) => {
  dbapi.pokemons.find((pokemons) => {
    res.json(pokemons);
  })
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

let server = http.createServer(app).listen(port, () => {
  console.log(`Server listening in port ${port}`);
});

const io = engine.listen(server);

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    io.emit('message', msg);
  })
})
