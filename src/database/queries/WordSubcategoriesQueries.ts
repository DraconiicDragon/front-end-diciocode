import WordSubcategory from "../models/WordSubcategoryModel.ts";

export default class WordSubcategoryQuery {

    static async getWordsBySubcategoryId(id_subcategory: number, limit: number) {
        if(limit) {
            return await WordSubcategory.findAll({
                where: {
                    id_subcategory: id_subcategory,
                },
                limit,
            });
        }
        return await WordSubcategory.findAll({
            where: {
                id_subcategory: id_subcategory,
            },
        });
    }

    static async getSubcategoriesbyWordId(id_word: number, limit: number) {
        if(limit) {
            return await WordSubcategory.findAll({
                where: {
                    id_word: id_word,
                },
                limit,
            });
        }
        return await WordSubcategory.findAll({
            where: {
                id_word: id_word,
            },
        });
    }

    static async createWordSubcategory(id_word: number, id_subcategory) {
        return await WordSubcategory.create({ id_word: id_word, id_subcategory: id_subcategory });
    }

    static async deleteWordSubcategory(id_wordSubcategory: number) {
        return await WordSubcategory.destroy({
            where: {
                id_wordSubcategory: id_wordSubcategory,
            },
        });
    }

    static async updateWordSubcategory(id_wordSubcategory: number, id_word: number, id_subcategory: number) {
        return await WordSubcategory.update(
            {
                id_word: id_word,
                id_subcategory: id_subcategory,
            },
            {
                where: {
                    id_wordSubcategory: id_wordSubcategory,
                },
            },
        );
    }
}