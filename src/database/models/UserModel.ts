import { DataTypes, Model } from "sequelize";
import sequelize from "../Database.ts";

export interface IUser {
  id_user?: number;
  email: string;
  user: string;
  password: string;
  avatar: string;
  id_role: number;
}

class User extends Model<IUser> {
  declare id_user?: number;
  declare email: string;
  declare user: string;
  declare password: string;
  declare avatar: string;
  declare id_role: number;
}

User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_role: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
