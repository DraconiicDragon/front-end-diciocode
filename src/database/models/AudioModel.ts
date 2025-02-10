import { DataTypes, Model } from "sequelize";
import sequelize from "../Database.ts";

export interface IAudio {
  id_audio?: number;
  path: string;
}

class Audio extends Model<IAudio> {
  declare id_audio?: number;
  declare path: string;
}

Audio.init(
  {
    id_audio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Audio",
  }
);

export default Audio;
