import sequelize from "sequelize";
import Category from "../models/CategoryModel.ts"

export default class CategoryQuery {

    static async getCategories(limit: number) {
        if(limit) {
            return await Category.findAll({
                limit,
            });
        }
        return await Category.findAll();
    }

    static async getCategoryById(id: number) {
        return await Category.findByPk(id);
    }

    static async getCategoriesByName(name: string) {
        const op = sequelize.Op;
        return await Category.findAll({
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

    static async createCategory(name: string, description: string) {
        return await Category.create({ name: name, description: description });
    }

    static async deleteCategory(id: number) {
        return await Category.destroy({
            where: {
                id_category: id,
            },
        });
    }

    static async updateCategory(id: number, name: string, description: string) {
        return await Category.update(
            {
                name: name,
                description: description,
            },
            {
                where: {
                    id_category: id,
                },
            },
        );
    }
    
}