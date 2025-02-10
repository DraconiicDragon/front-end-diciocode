import Audio from "../models/AudioModel.ts";

export default class AudiosQueries {
  static async getAudios(limit: number) {
    if (limit) {
      return await Audio.findAll({
        limit,
      });
    }
    return await Audio.findAll();
  }

  static async getAudioById(id: number) {
    return await Audio.findByPk(id);
  }

  static async getAudioByPath(path: string) {
    return await Audio.findOne({
      where: {
        path,
      },
    });
  }

  static async createAudio(path: string) {
    return await Audio.create({
      path,
    });
  }

  static async deleteAudioById(id: number) {
    return await Audio.destroy({
      where: {
        id_audio: id,
      },
    });
  }

  static async deleteAudioByPath(path: string) {
    return await Audio.destroy({
      where: {
        path,
      },
    });
  }
}
