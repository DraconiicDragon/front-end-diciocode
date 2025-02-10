import { DataTypes, Model } from "sequelize";
import sequelize from "../Database.ts";

export interface IWord {
  id_word?: number;
  word_english: string;
  word_portuguese: string;
  id_audio_normal: number;
  id_audio_slowed: number;
}

class Word extends Model<IWord> {
  declare id_word?: number;
  declare word_english: string;
  declare word_portuguese: string;
  declare id_audio_normal: number;
  declare id_audio_slowed: number;
}

Word.init(
  {
    id_word: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    word_english: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    word_portuguese: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_audio_normal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_audio_slowed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Word",
  }
);

export default Word;
