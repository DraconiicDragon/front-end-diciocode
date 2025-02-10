import { DataTypes, Model } from "sequelize";
import sequelize from "../Database.ts";

export interface ISubcategory {
    id_subcategory?: number;
    name: string;
    description: string;
    id_category: number;
}

class Subcategory extends Model<ISubcategory> {
    declare id_subcategory?: number;
    declare name: string;
    declare description: string;
    declare id_category: number;
}

Subcategory.init(
    {
        id_subcategory: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_category: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Subcategory",
    }
);

export default Subcategory;