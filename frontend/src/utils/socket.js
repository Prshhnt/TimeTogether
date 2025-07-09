// src/socket.js
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://192.168.240.156:4000'; // Change if deploying

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});
