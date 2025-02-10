import sequelize from "sequelize";
import User from "../models/UserModel.ts";

export default class UserQuery {
  static async getUsers(limit: number) {
    if (limit) {
      return await User.findAll({
        limit,
      });
    }
    return await User.findAll();
  }
  static async getUserById(id: number) {
    return await User.findByPk(id);
  }
  static async getUserByName(name: string) {
    const op = sequelize.Op;
    return await User.findOne({
      where: {
        [op.or]: [{user: name}, {email: name}]  
      },
    });
  }
  static async getUsersByName(name: string) {
    const op = sequelize.Op;
    return await User.findAll({
      where: {
        [op.or]: [
          {
            user: {
              [op.like]: "%"+name+"%"
            }
          },
          {
            email: {
              [op.like]: "%"+name+"%" 
            }
          }
        ]  
      },
    });
  }
  static async getUserByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }
  static async createUser(email: string, user: string, password: string) {
    return await User.create({ email: email, user: user, password: password, avatar: "default", id_role: 2 });
  }
  static async deleteUser(id: string) {
    return await User.destroy({
      where: {
        id_user: id,
      },
    });
  }
  static async updateUser(
    id: string,
    email: string,
    user: string,
  ) {
    return await User.update(
      {
        email: email,
        user: user,
      },
      {
        where: {
          id_user: id,
        },
      }
    );
  }
  static async updatePassword(
    id: number,
    password: string
  ) {
    return await User.update(
      {
        password: password
      },
      {
        where: {
          id_user: id
        }
      }
    );
  }
}
