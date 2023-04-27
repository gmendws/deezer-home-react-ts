import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routerLogin from './routes/login';
import routerRegister from './routes/register';
import cors from 'cors';

dotenv.config();

const app = express()
app.use(cors())
app.use(json())
app.use(routerLogin)
app.use(routerRegister)

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
  .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.vghpoaf.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Conectado ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))

