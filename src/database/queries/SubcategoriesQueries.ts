import sequelize from "sequelize";
import Subcategory from "../models/SubcategoryModel.ts";

export default class SubcategoryQuery {
    
    static async getSubcategories(limit: number) {
        if(limit) {
            return await Subcategory.findAll({
                limit,
            });
        }
        return await Subcategory.findAll();
    }

    static async getSubcategoryById(id: number) {
        return await Subcategory.findByPk(id);
    }

    static async getSubcategoriesByName(name: string) {
        const op = sequelize.Op;
        return await Subcategory.findAll({
            where: {
                [op.or]: [
                  {
                    name: {
                      [op.like]: "%"+name+"%"
                    }
                  },
                  {
                    description: {
                      [op.like]: "%"+name+"%" 
                    }
                  }
                ]  
            },
        });
    }

    static async getSubcategoriesByCategoryId(id_category: number) {
        return await Subcategory.findAll({
            where: {
                id_category: id_category,
            },
        });
    }

    static async createSubcategory(name: string, description: string, id_category: number) {
        return await Subcategory.create({ name: name, description: description, id_category: id_category });
    }

    static async deleteSubcategory(id: number) {
        return await Subcategory.destroy({
            where: {
                id_subcategory: id,
            },
        });
    }

    static async updateSubcategory(id: number, name: string, description: string, id_category: number) {
        return await Subcategory.update(
            {
                name: name,
                description: description,
                id_category: id_category,
            },
            {
                where: {
                    id_subcategory: id,
                },
            },
        );
    }
}