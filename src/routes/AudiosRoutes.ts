import { json, Router, static as static_ } from "express";
import path from "path";
import { fileURLToPath } from "url";
import AudiosQueries from "../database/queries/AudiosQueries.ts";
import { checkIfLoggedIn } from "./Middlewares.ts";

const audiosRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

audiosRouter.use(
  "/static",
  static_(path.join(path.join(__dirname, "../../assets/audios")))
);

audiosRouter.use(json());
audiosRouter.use(checkIfLoggedIn);

audiosRouter.post("/", async (req, res) => {
  const { path: pathAudio } = req.body;
  if (!pathAudio) {
    res.status(400).json({ error: "Caminho do áudio não informado." });
    return;
  }
  try {
    const audio = await AudiosQueries.createAudio(pathAudio);
    res.status(201).json({
      id: audio.id_audio,
      path: audio.path,
    });
    return;
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar um áudio." });
    return;
  }
});

audiosRouter.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    const audios = await AudiosQueries.getAudios(
      isNaN(Number(limit)) ? 0 : Number(limit)
    );
    if (!audios) {
      res.status(500).json({ error: "Erro ao buscar áudios." });
      return;
    }
    res.status(200).json({ audios });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar áudios." });
    return;
  }
});

audiosRouter.get("/id/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const audio = await AudiosQueries.getAudioById(Number(id));
    if(!audio) {
      res.status(500);
      return;
    }
    res.status(200).json( { audio });
    return;
  } catch (error) {
    res.status(500);
    return;
  }
});

audiosRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: "ID do áudio não informado." });
    return;
  }
  try {
    const audio = await AudiosQueries.getAudioById(Number(id));
    if (!audio) {
      res.status(404).json({ error: "Áudio não encontrado." });
      return;
    }
    const destroy = await AudiosQueries.deleteAudioById(Number(id));
    res.sendStatus(destroy ? 204 : 500);
    return;
  } catch (error) {
    res.sendStatus(500);
    return;
  }
});

audiosRouter.patch("/", async (req, res) => {
  const { id, path: pathAudio } = req.body;
  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: "ID do áudio não informado." });
    return;
  }
  if (!pathAudio) {
    res.status(400).json({ error: "Caminho do áudio não informado." });
    return;
  }
  try {
    const audio = await AudiosQueries.getAudioById(Number(id));
    if (!audio) {
      res.status(404).json({ error: "Áudio não encontrado." });
      return;
    }
    audio.path = pathAudio;
    await audio.save();
    res.status(200).json({
      id: audio.id_audio,
      path: audio.path,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar um áudio." });
    return;
  }
});

export default audiosRouter;
