const express = require('express');

const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Connects when client visits site
io.on('connection', (socket) => {
  console.log('A user connected');

  // Accept messages from client and output in terminal
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });

  // Send message to everyone including sender
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Test 10 second interval to send message back to client
  //setInterval(() => { io.emit('chat message', 'Ping!') }, 10000);

  // Disconnects when user closes site
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
