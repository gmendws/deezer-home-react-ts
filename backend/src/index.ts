import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routerLogin from './routes/login';
import routerRegister from './routes/register';
import cors from 'cors';
import routerCreateMusic from './routes/createMusic';
import routerMusic from './routes/music';
import fs from 'fs';
import https from 'https';
import morgan from 'morgan';
import path from 'path';
import { createStream } from 'rotating-file-stream';
import { Server, Socket } from 'socket.io';
import http from 'http';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

const logFormat = process.env.LOG_FORMAT || 'combined';
const logDirectory = path.join(__dirname, 'logs');
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const maxConnections = 5;

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = createStream('access.log', {
  interval: '1d',
  path: logDirectory,
});

app.use(morgan(logFormat, { stream: accessLogStream }));
app.use(routerLogin);
app.use(routerRegister);
app.use(routerCreateMusic);
app.use(routerMusic);

const options = {
  key: fs.readFileSync('src/SSL/code.key'),
  cert: fs.readFileSync('src/SSL/code.crt'),
};

https.createServer(options, app).listen(3001, () =>
  console.log('Rodando https!')
);

const server = http.createServer(app);
const connectedUsers: string[] = [];
const io = new Server(server);

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

  socket.on('chat message', (message: string) => {
    console.log('Mensagem recebida:', message);
    const username = getUsernameBySocketId(socket.id);
    io.emit('chat message', { username, message });
  });
});

function getUsernameBySocketId(socketId: string): string | undefined {
  for (const userId of connectedUsers) {
    if (userId === socketId) {
      return userId;
    }
  }
  return undefined;
}

mongoose
  .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.vghpoaf.mongodb.net/?retryWrites=true&w=majority`, {
    maxPoolSize: maxConnections,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log('Conectado ao banco!');
    app.listen(3000);
  })
  .catch((err) => console.log(err));
