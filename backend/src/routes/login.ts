import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../../models/User";
import dotenv from 'dotenv';
import createChannel from "../middlewares/channelRabbit";
import xss from 'xss';
import io from "../socket-io";

const routerLogin = Router();
dotenv.config();

routerLogin.post("/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const sanitizedEmail = xss(email).trim();
  const sanitizedPassword = xss(password).trim();

  if (!sanitizedEmail) {
    return res.status(400).json({ error: "O e-mail é obrigatório!" });
  }

  if (!sanitizedPassword) {
    return res.status(400).json({ error: "A senha é obrigatória!" });
  }

  try {
    const user = await User.findOne({ email: sanitizedEmail });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado!" });
    }

    const passwordMatch = await bcrypt.compare(sanitizedPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Senha inválida!" });
    }

    io.emit('join', user.email, (error: Error) => {
      if (error) {
        // A emissão da mensagem falhou
        console.error('Erro ao emitir a mensagem para o socket de join:', error);
      } else {
        // A mensagem foi emitida com sucesso
        console.log('Mensagem emitida para o socket de join');
      }
    });

    const log = { timestamp: new Date(), email: user.email, action: 'login' };
    const channel = await createChannel();
    channel.sendToQueue('logs-fila', Buffer.from(JSON.stringify(log)));

    const secret = process.env.SECRET as Secret;

    const token = jwt.sign({ id: user._id }, secret); 
    const escapedToken = encodeURIComponent(token);

    res.status(200).json({ name: user.name, message: "Autenticação realizada com sucesso", token: escapedToken });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Aconteceu um erro no servidor, tente novamente mais tarde!" });
  }
});

export default routerLogin;
