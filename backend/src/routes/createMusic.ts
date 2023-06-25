import { Router, Request, Response } from "express";
import { Music } from "../../models/Music";
import authenticateToken from "../middlewares/authenticateToken";

const routerCreateMusic = Router();

routerCreateMusic.post("/music", authenticateToken, async (req: Request, res: Response) => {
  const { name, singer } = req.body;

  if (!name) {
    return res.status(422).json({ msg: "O nome da música é obrigatório!" });
  }

  if (!singer) {
    return res.status(422).json({ msg: "O nome do cantor é obrigatório!" });
  }

  try {
    const music = Music.build({ name, singer });

    await music.save();

    res.status(201).json({ msg: "Música cadastrada com sucesso" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: "Aconteceu um erro no servidor, tente novamente mais tarde!!" });
  }
});

export default routerCreateMusic;
