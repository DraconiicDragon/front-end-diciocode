import CategoryQuery from "../../database/queries/CategoriesQueries.ts";

export class CategoryController {
    static async getCategories(req, res) {
        try {
            const { limit } = req.query;
            const categories = await CategoryQuery.getCategories(
                isNaN(Number(limit)) ? 0 : Number(limit)
            );
            if (!categories) res.status(500).json({ error: "Erro ao buscar categorias." });
            return res.status(200).json({ categories });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar categorias. "});
        }
    }

    static async getCategoryById(req, res) {
        const id = req.params.id;
        if(!id) {
            return res.status(400).json({ error: "ID inválido." });
        }
        try {
            const category = await CategoryQuery.getCategoryById(Number(id));
            if(!category) {
                return res.status(404).json({ error: "Categoria não encontrada." });
            }
            return res.status(200).json({ category });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar categoria." });
        }
    }

    static async getCategoriesByName(req, res) {
        const name = req.params.name;
        if(!name) {
            return res.status(400).json({ error: "Nome inválido." });
        }
        try {
            const categories = await CategoryQuery.getCategoriesByName(name);
            if(!categories) {
                return res.status(404).json({ error: "Categoria não encontrada." });
            }
            return res.status(200).json({ categories });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar categoria." });
        }
    }

    static async createCategory(req, res) {
        const { name, description } = req.body;
        if(!name || !description) {
            return res.status(400).json({ error: "Parâmetros inválidos." });
        }
        try {
            const category = await CategoryQuery.createCategory(name, description);
            if(!category) {
                return res.status(500).json({ error: "Erro ao criar a categoria." });
            }
            return res.status(201).json({
                id: category.id_category,
                name: category.name,
                description: category.description,
            });
        } catch(error) {
            return res.status(500).json({ error: "Erro ao criar a categoria." });
        }
    }

    static async updateCategory(req, res) {
        const { id, name, description } = req.body;
        if(!id || !name || !description) {
            return res.status(400).json({ error: "Parâmetros inválidos." });
        }
        try {
            const updatedCategory = await CategoryQuery.updateCategory(id, name, description);
            if(!updatedCategory) {
                return res.status(500).json({ error: "Erro ao atualizar categoria." });
            }
            return res.status(200).json({
                message: "Categoria atualizada com sucesso.",
            });
        } catch(error) {
            return res.status(500).json({ error: "Erro ao atualizar categoria." });
        }
    }

    static async deleteCategory(req, res) {
        const id = parseInt(req.params.id);
        if(!id || isNaN(id)) {
            return res.status(400).json({ error: "Parâmetros inválidos." });
        }
        try {
            const category = await CategoryQuery.deleteCategory(id);
            return res.status(200).json({ message: "Categoria deletado com sucesso." });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao deletar categoria." });
        }
    }
}