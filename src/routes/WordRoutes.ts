import { json, Router } from "express";
import WordQueries from "../database/queries/WordsQueries.ts";
import type { IWord } from "../database/models/WordModel.ts";
import { checkIfLoggedIn } from "./Middlewares.ts";

const wordsRoutes = Router();

wordsRoutes.use(json({
    type: ['application/json', 'text/plain']
}));
wordsRoutes.use(checkIfLoggedIn);

wordsRoutes.get("/", async (req, res) => {
  res.render("words");
});

wordsRoutes.get("/all", async (req, res) => {
  const { limit } = req.query;
  if (limit && isNaN(Number(limit))) {
    res.status(400).json({ error: "Limite inválido." });
    return;
  }
  try {
    const words = await WordQueries.getWords(Number(limit));
    if (!words) {
      res.status(500).json({ error: "Erro ao buscar palavras." });
      return;
    }
    res.status(200).json({ words });
    return;
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar palavras." });
    return;
  }
});

wordsRoutes.get("/id/:id", async (req, res) => {
  const id = req.params.id;
  if(!id) {
    res.status(400);
    return;
  }
  try {
    const word = await WordQueries.getWordById(Number(id));
    if(!word) {
      res.status(404).json({});
      return;
    }
    res.status(200).json( { word });
    return;
  } catch (error) {
    res.status(500);
    return;
  }
});

wordsRoutes.get("/pt/:word", async (req, res) => {
  const { word } = req.params;
  if (!word) {
    res.status(400).json({ error: "Palavra não informada." });
    return;
  }
  try {
    const wordFound = await WordQueries.getWordByPortugueseWord(word);
    if (!wordFound) {
      res.status(404).json({ error: "Palavra não encontrada." });
      return;
    }
    res.status(200).json({
      id: wordFound.id_word,
      word_english: wordFound.word_english,
      word_portuguese: wordFound.word_portuguese,
      id_audio_normal: wordFound.id_audio_normal,
      id_audio_slowed: wordFound.id_audio_slowed,
    });
    return;
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar palavra." });
    return;
  }
});

wordsRoutes.get("/en/:word", async (req, res) => {
  const { word } = req.params;
  if (!word) {
    res.status(400).json({ error: "Palavra não informada." });
    return;
  }
  try {
    const wordFound = await WordQueries.getWordByEnglishWord(word);
    if (!wordFound) {
      res.status(404).json({ error: "Palavra não encontrada." });
      return;
    }
    res.status(200).json({
      id: wordFound.id_word,
      word_english: wordFound.word_english,
      word_portuguese: wordFound.word_portuguese,
      id_audio_normal: wordFound.id_audio_normal,
      id_audio_slowed: wordFound.id_audio_slowed,
    });
    return;
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar palavra." });
    return;
  }
});

wordsRoutes.post("/", async (req, res) => {
  const { word_english, word_portuguese, id_audio_normal, id_audio_slowed } =
    req.body;
  if (
    !word_english ||
    !word_portuguese ||
    !id_audio_normal ||
    !id_audio_slowed ||
    isNaN(Number(id_audio_normal)) ||
    isNaN(Number(id_audio_slowed))
  ) {
    res.status(400).json({ error: "Palavra não informada." });
    return;
  }
  try {
    const newWord = await WordQueries.createWord({
      word_english,
      word_portuguese,
      id_audio_normal,
      id_audio_slowed,
    });
    if (!newWord) {
      res.status(500).json({ error: "Erro ao criar uma palavra." });
      return;
    }
    res.status(201).json({
      id: newWord.id_word,
      word_english: newWord.word_english,
      word_portuguese: newWord.word_portuguese,
      id_audio_normal: newWord.id_audio_normal,
      id_audio_slowed: newWord.id_audio_slowed,
    });
    return;
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar uma palavra." });
    return;
  }
});

wordsRoutes.patch("/", async (req, res) => {
  const {
    id,
    word_english,
    word_portuguese,
    id_audio_normal,
    id_audio_slowed,
  } = req.body;

  if (!id) {
    res.status(400).json({ error: "Parâmetros inválidos." });
    return;
  }

  try {
    const updatedWord = await WordQueries.updateWord({
      id_word: id,
      word_english: word_english,
      word_portuguese: word_portuguese,
      id_audio_normal: id_audio_normal,
      id_audio_slowed: id_audio_slowed,
    });
    if (!updatedWord) {
      res.status(500).json({ error: "Erro ao atualizar palavra." });
      return;
    }
    res.status(200).json({ message: "Palavra atualizada com sucesso." });
    return;
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar palavra." });
    return;
  }
});

wordsRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: "ID inválido." });
    return;
  }
  try {
    const deletedWord = await WordQueries.deleteWord(Number(id));
    if (!deletedWord) {
      res.sendStatus(500);
      return;
    }
    res.sendStatus(200);
    return;
  } catch (error) {
    res.sendStatus(500);
    return;
  }
});

export default wordsRoutes;
