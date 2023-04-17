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
    return res.status(422).json({ msg: "O e-mail é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).json({ msg: "Usuario não encontrado!" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ msg: "Senha inválida!" });
    }

    const secret = process.env.SECRET as Secret;

    const token = jwt.sign({ id: user._id }, secret); 

    res.status(200).json({ msg: "Autenticação realizada com sucesso", token });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: "Aconteceu um erro no servidor, tente novamente mais tarde!!" });
  }
});

export default routerLogin;
