import { Router, Request, Response } from "express";
import { Music } from "../../models/Music";
import { param, validationResult } from "express-validator";
import redisClient from "../middlewares/redisClient";
import authenticateToken from "../middlewares/authenticateToken";

const routerMusic = Router();

routerMusic.get("/music/:musicSearch?", [
  param("musicSearch")
    .optional()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("O campo 'Música' deve conter apenas letras e espaços"),
], authenticateToken, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  try {
    const { musicSearch } = req.params;
    const regex = musicSearch ? new RegExp(musicSearch, "i") : /.*/;
    const musicsFromCache = await redisClient.get('AllMusics');
    if (musicsFromCache && musicSearch === '') {
      return res.send(JSON.parse(musicsFromCache));
    }
    const musics = await Music.find({ name: regex });
    if(musicSearch === '') {
      await redisClient.set("AllMusics", JSON.stringify(musics));
    }
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