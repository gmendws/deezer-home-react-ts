import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routerLogin from './routes/login';
import routerRegister from './routes/register';
import cors from 'cors';
import routerCreateMusic from './routes/createMusic';
import routerMusic from './routes/music';

dotenv.config();

const app = express()
app.use(cors())
app.use(json())

app.use(routerLogin)
app.use(routerRegister)
app.use(routerCreateMusic)
app.use(routerMusic)

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const maxConections = 5;

mongoose
  .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.vghpoaf.mongodb.net/?retryWrites=true&w=majority`, {
    maxPoolSize: maxConections
  })
  .then(() => {
    console.log('Conectado ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))

