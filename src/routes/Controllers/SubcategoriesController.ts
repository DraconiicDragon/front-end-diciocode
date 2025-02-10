import { error } from "console";
import SubcategoryQuery from "../../database/queries/SubcategoriesQueries.ts";
import WordSubcategoryQuery from "../../database/queries/WordSubcategoriesQueries.ts";

export class SubcategoryController {
    
    static async getSubcategories(req, res) {
        try {
            const { limit } = req.query;
            const subcategories = await SubcategoryQuery.getSubcategories(
                isNaN(Number(limit)) ? 0 : Number(limit)
            );
            if(!subcategories) res.status(500).json({ error: "Erro ao buscar subcategorias." });
            return res.status(200).json({ subcategories });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar subcategorias" });
        }
    }

    static async getSubcategoryById(req, res) {
        const id = req.params.id;
        if(!id) {
            return res.status(400).json({ error: "ID inválido." });
        }
        try {
            const subcategory = await SubcategoryQuery.getSubcategoryById(Number(id));
            if(!subcategory) {
                return res.status(404).json({ error: "Subcategoria não encontrada." });
            }
            return res.status(200).json({ subcategory });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar subcategoria. "});
        }
    } 

    static async getSubcategoriesByName(req, res) {
        const name = req.params.name;
        if(!name) {
            return res.status(400).json({ error: "Parâmetro inválido." });
        }
        try {
            const subcategories = await SubcategoryQuery.getSubcategoriesByName(name);
            if(!subcategories) {
                return res.status(404).json({ error: "Subcategoria não encontrada. "});
            }
            return res.status(200).json({ subcategories });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar subcategoria. " });
        }
    }

    static async getWordsBySubcategoryId(req, res) {
        const id = req.params.id_subcategory;
        const limit = req.query;
        if(!id) {
            return res.status(400).json({ error: "ID inválido" });
        }
        try {
            const words = await WordSubcategoryQuery.getWordsBySubcategoryId(
                Number(id), 
                isNaN(Number(limit)) ? 0 : Number(limit)
            );
            if(!words) return res.status(500).json({ error: "Erro ao buscar lista de palavras." });
            return res.status(200).json({ words });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar lista de palavras." });
        }
    }

    static async getSubcategoriesByCategoryId(req, res) {
        const id = req.params.id_category;
        if(!id) {
            return res.status(400);
        }
        try {
            const subcategories = await SubcategoryQuery.getSubcategoriesByCategoryId(Number(id));
            if(!subcategories) return res.status(500);
            return res.status(200).json({ subcategories });
        } catch (error) {
            return res.status(500);
        }
    }

    static async createSubcategory(req, res) {
        const { name, description, id_category} = req.body;
        if(!name || !description || !id_category) {
            return res.status(400).json({ error: "Parâmetros inválidos. " });
        }
        try {
            const subcategory = await SubcategoryQuery.createSubcategory(name, description, id_category);
            if(!subcategory) {
                return res.status(500).json({ error: "Erro ao criar a subcategoria." });
            }
            return res.status(201).json({
                id: subcategory.id_subcategory,
                name: subcategory.name,
                description: subcategory.description,
                id_category: subcategory.id_category,
            });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar a subcategoria." });
        }
    }

    static async addWordtoSubcategory(req, res) {
        const { id_word, id_subcategory} = req.body;
        if(!id_word || !id_subcategory) {
            return res.status(400).json({ error: "Parâmetros inválidos." });
        }
        try {
            const result = await WordSubcategoryQuery.createWordSubcategory(id_word, id_subcategory);
            if(!result) {
                return res.status(500).json({ error: "Erro ao adicionar palavra a subcategoria." });
            }
            return res.status(201).json({ result });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao adicionar palavra a subcategoria." });
        }
    }

    static async removeWordFromSubcategory(req, res) {
        const id = req.params.id;
        if(!id) {
            return res.status(400);
        }
        try {
            const result = await WordSubcategoryQuery.deleteWordSubcategory(id);
            if(!result) {
                return res.status(500);
            }
            return res.status(200).json({ });
        } catch (error) {
            return res.status(500);
        }
    }

    static async updateSubcategory(req, res) {
        const { id, name, description, id_category } = req.body;
        if(!id || !name || !description || !id_category) {
            return res.status(400).json({ error: "Parâmetros inválidos. " });
        }
        try {
            const updatedCategory = await SubcategoryQuery.updateSubcategory(id, name, description, id_category);
            if(!updatedCategory) {
                return res.status(500).json({ error: "Erro ao atualizar subcategoria." });
            }
            return res.status(200).json({
                message: "Subcategoria atualizada com sucesso.",
            });
        } catch(error) {
            return res.status(500).json({ error: "Erro ao atualizar a subcategoria." });
        }
    }

    static async deleteSubcategory(req, res) {
        const id = parseInt(req.params.id);
        if(!id || isNaN(id)) {
            return res.status(400).json({ error: "Parâmetros inválidos." });
        }
        try {
            const subcategory = await SubcategoryQuery.deleteSubcategory(id);
            return res.status(200).json({ message: "Subcategoria deletada com sucesso." });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao deletar a subcategoria." });
        }
    }
}