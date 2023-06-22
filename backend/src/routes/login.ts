import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../../models/User";
import dotenv from 'dotenv';

const routerLogin = Router();
dotenv.config();

routerLogin.post("/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "O e-mail é obrigatório!" });
  }

  if (!password) {
    return res.status(400).json({ error: "A senha é obrigatória!" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Senha inválida!" });
    }

    const secret = process.env.SECRET as Secret;

    const token = jwt.sign({ id: user._id }, secret); 

    res.status(200).json({ message: "Autenticação realizada com sucesso", token });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Aconteceu um erro no servidor, tente novamente mais tarde!" });
  }
});

export default routerLogin;
