import Word, { type IWord } from "../models/WordModel.ts";

export default class WordQueries {
  static async getWords(limit: number) {
    return await Word.findAll({
      limit: limit || null,
    });
  }

  static async getWordById(id: number) {
    return await Word.findByPk(id);
  }

  static async getWordByPortugueseWord(word_portuguese: string) {
    return await Word.findOne({
      where: {
        word_portuguese,
      },
    });
  }

  static async getWordByEnglishWord(word_english: string) {
    return await Word.findOne({
      where: {
        word_english,
      },
    });
  }

  static async createWord({
    word_english,
    word_portuguese,
    id_audio_normal,
    id_audio_slowed,
  }: Omit<IWord, "id_word">) {
    return await Word.create({
      word_english,
      word_portuguese,
      id_audio_normal,
      id_audio_slowed,
    });
  }

  static async updateWord({
    id_word,
    word_english,
    word_portuguese,
    id_audio_normal,
    id_audio_slowed,
  }: IWord) {
    return await Word.update(
      {
        word_english: word_english,
        word_portuguese: word_portuguese,
        id_audio_normal: id_audio_normal,
        id_audio_slowed: id_audio_slowed,
      },
      {
        where: {
          id_word: id_word,
        },
      }
    );
  }

  static async deleteWord(id: number) {
    return await Word.destroy({
      where: {
        id_word: id,
      },
    });
  }
}
