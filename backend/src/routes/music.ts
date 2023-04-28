import { Router, Request, Response } from "express";
import { Music } from "../../models/Music";

const routerMusic = Router();

routerMusic.get("/music", async (req: Request, res: Response) => {
  try {
    const musics = await Music.find({});
    res.status(200).json(musics);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: "Aconteceu um erro no servidor, tente novamente mais tarde!!" });
  }
});

export default routerMusic;
