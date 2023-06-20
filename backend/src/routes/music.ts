import { Router, Request, Response } from "express";
import { Music } from "../../models/Music";
import { param, validationResult } from "express-validator";

const routerMusic = Router();

routerMusic.get("/music/:musicSearch", [
  param("musicSearch")
    .notEmpty()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("O campo 'Música' é obrigatório e deve conter apenas letras e espaços"),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  try {
    const { musicSearch } = req.params;
    const regex = new RegExp(musicSearch, "i");
    const musics = await Music.find({ name: regex });
    if (musics.length === 0) {
      return res.status(404).json({ errors: "Nenhuma música encontrada!" });
    }
    res.status(200).json(musics);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Aconteceu um erro no servidor, tente novamente mais tarde!" });
  }
});

export default routerMusic;
