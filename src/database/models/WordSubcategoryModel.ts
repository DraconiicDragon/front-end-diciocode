import { DataTypes, Model } from "sequelize";
import sequelize from "../Database.ts";

export interface IWordSubcategory {
    id_wordSubcategory?: number;
    id_word: number;
    id_subcategory: number;
}

class WordSubcategory extends Model<IWordSubcategory> {
    declare id_wordSubcategory?: number;
    declare id_word: number;
    declare id_subcategory: number;
}

WordSubcategory.init(
    {
        id_wordSubcategory: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_word: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_subcategory: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: "WordSubcategory",
    }
); 

export default WordSubcategory;