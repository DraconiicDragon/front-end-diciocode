import { DataTypes, Model } from "sequelize";
import sequelize from "../Database.ts";

export interface ICategory {
    id_category?: number;
    name: string;
    description: string;
}

class Category extends Model<ICategory> {
    declare id_category?: number;
    declare name: string;
    declare description: string;
}

Category.init(
    {
        id_category: {
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
    },
    {
        sequelize,
        modelName: "Category",
    }
);

export default Category;