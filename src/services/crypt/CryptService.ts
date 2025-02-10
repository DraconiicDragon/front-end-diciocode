import { compare, hash } from "bcrypt";

export default class CryptService {
  static async encryptPassword(password: string) {
    const saltRounds = 10;
    return await hash(password, saltRounds);
  }

  static async verifyPassword(password: string, hash: string) {
    return await compare(password, hash);
  }
}
