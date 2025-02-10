import UserQuery from "../../database/queries/UsersQueries.ts";
import CryptService from "../../services/crypt/CryptService.ts";

export class UsersController {
    static async getUsers(req, res) {
        try {
            const { limit } = req.query;
            const users = await UserQuery.getUsers(
                isNaN(Number(limit)) ? 0 : Number(limit)
            );
            if (!users) res.status(500).json({ error: "Erro ao buscar usuários." });
            return res.status(200).json({ users });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar usuários." });
        }
    }

    static async getUserById(req, res) {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "ID inválido." });
        }
        try {
            const user = await UserQuery.getUserById(Number(id));
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }
            return res.status(200).json({ user });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar usuário." });
        }
    }

    static async getUserByEmail(req, res) {
        const email = req.params.email;
        if (!email) {
            return res.status(400).json({ error: "ID inválido." });
        }
        try {
            const user = await UserQuery.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }
            return res.status(200).json({ user });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar usuário." });
        }
    }

    static async getUsersByName(req, res) {
        const name = req.params.name;
        if (!name) {
            return res.status(400).json({ error: "Nome não encontrado." });
        }
        try {
            const users = await UserQuery.getUsersByName(name);
            if (!users) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }
            return res.status(200).json({ users });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar usuário." });
        }
    }

    static async updateUser(req, res) {
        const { id, email, user } = req.body;
        if (!id || !email || !user) {
            return res.status(400).json({ error: "Parâmetros inválidos." });
        }
        try {
            const updatedUser = await UserQuery.updateUser(id, email, user);
            if (!updatedUser) {
                return res.status(500).json({ error: "Erro ao atualizar usuário." });
            }
            return res.status(200).json({
                message: "Usuário atualizado com sucesso.",
            });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar usuário." });
        }
    }

    static async updatePassword(req, res) {
        const { id, password } = req.body;
        if (!id || !password) {
            return res.status(400).json({ error: "Parâmetros inválidos." });
        }
        try {
            const encryptedPassword = await CryptService.encryptPassword(password);
            const updatedPassword = await UserQuery.updatePassword(id, encryptedPassword);
            if (!updatedPassword) {
                return res.status(500).json({ error: "Erro ao atualizar a senha." });
            }
            return res.status(200).json({
                message: "Senha atualizada com sucesso."
            });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao atualizar senha." });
        }
    }

    static async deleteUser(req, res) {
        const id = parseInt(req.params.id);
        if (!id || isNaN(id)) {
            return res.sendStatus(400);
        }
        try {
            const user = await UserQuery.deleteUser(req.params.id);
            res.sendStatus(200);
        } catch (error) {
            return res.sendStatus(500);
        }
    }
}