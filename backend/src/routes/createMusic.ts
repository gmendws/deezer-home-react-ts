import { Router, Request, Response } from "express";
import { Music } from "../../models/Music";

const routerCreateMusic = Router();

routerCreateMusic.post("/createMusic", async (req: Request, res: Response) => {
  const { nameMusic, singer } = req.body;

  if (!nameMusic) {
    return res.status(422).json({ msg: "O nome da música é obrigatório!" });
  }

  if (!singer) {
    return res.status(422).json({ msg: "O nome do cantor é obrigatório!" });
  }

  try {
    const music = Music.build({ nameMusic, singer });

    await music.save();

    res.status(200).json({ msg: "Música cadastrada com sucesso" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: "Aconteceu um erro no servidor, tente novamente mais tarde!!" });
  }
});

export default routerCreateMusic;
