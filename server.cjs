// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // Relay playback events to everyone else in the room
  socket.on('play', (roomId) => {
    socket.to(roomId).emit('play');
  });

  socket.on('pause', (roomId) => {
    socket.to(roomId).emit('pause');
  });

  socket.on('seek', ({ roomId, currentTime }) => {
    socket.to(roomId).emit('seek', { currentTime });
  });

  socket.on('changePlaybackSpeed', ({ roomId, speed }) => {
    socket.to(roomId).emit('changePlaybackSpeed', { speed });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});

