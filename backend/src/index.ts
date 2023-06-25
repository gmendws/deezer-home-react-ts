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
