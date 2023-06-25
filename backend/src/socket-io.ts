import express from "express";
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();

const server = http.createServer(app);

const connectedUsers: string[] = [];
export const io = require('socket.io')(server, {cors: {origin: 'http://localhost:5173'}});

server.listen(3002, () => console.log('Server Running...'));

io.on('connection', (socket: Socket) => {
  console.log('Novo cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
    const index = connectedUsers.indexOf(socket.id);
    if (index !== -1) {
      connectedUsers.splice(index, 1);
    }
  });

  socket.on('join', (username: string) => {
    console.log(`${username} entrou no chat`);
    connectedUsers.push(socket.id);
    socket.emit('chat message', { username: 'ChatBot', message: `Bem-vindo(a) ao chat, ${username}!` });
    socket.broadcast.emit('chat message', { username: 'ChatBot', message: `${username} entrou no chat` });
  });

  socket.on('chat message', (username: string, message: string) => {
    console.log('Mensagem recebida:', message);
    io.emit('chat message', { username, message });
  });
});

function getUsernameBySocketId(socketId: string): string | undefined {
  for (const userId of connectedUsers) {
    if (userId === socketId) {
      console.log(userId)
      return userId;
    }
  }
  return undefined;
}

export default io;