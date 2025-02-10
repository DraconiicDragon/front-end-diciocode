import User, { type IUser } from "../../database/models/UserModel.ts";
import UserQuery from "../../database/queries/UsersQueries.ts";
import CryptService from "../../services/crypt/CryptService.ts";

export class AuthController {
    static async login(req, res) {
        const { auth, password } = req.body;
        
        if (!auth || !password) {
            return res.status(400).json({ error: "Parâmetros inválidos." });
        }
        try {
            let user: User;

            // Verifica se é um email
            const re = /\S+@\S+\.\S+/;
            if (re.test(auth)) {
                user = await UserQuery.getUserByEmail(auth);
            } else {
                user = await UserQuery.getUserByName(auth);
            }

            if (!user) {
                return res.status(401).json({ error: "Usuário ou senha inválidos." });
            }
            const result = await CryptService.verifyPassword(password, user.password);
            if (!result) {
                return res.status(401).json({ error: "Usuário ou senha inválidos." });
            }
            req.session.user = {
                id_user: user.id_user,
                email: user.email,
                name: user.user,
                id_role: user.id_role,
            };          
            return res.status(200).json({ message: "Usuário logado com sucesso." });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao logar." });
        }
    }

    static async logout(req, res, next) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: "Erro ao deslogar." });
            } else {
                next();
            }
        });
    }

    static async register(req, res) {
        const { email, user, password } = req.body;
        if (!email || !user || !password) {
            return res.status(400).json({ error: "Parâmetros inválidos." });
        }
        const _user: Omit<IUser, "id_user" | "avatar" | "id_role"> = {
            email,
            user,
            password,
        };
        try {
            const encryptedPassword = await CryptService.encryptPassword(password);
            const newUser = await UserQuery.createUser(email, user, encryptedPassword);
            if (!newUser) {
                return res.status(500).json({ error: "Erro ao criar usuário." });
            }
            res.status(201).json({
                user: {
                    id_user: newUser.id_user,
                    email: newUser.email,
                    user: newUser.user,
                },
                message: "Usuário criado com sucesso.",
            });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao criar usuário." });
        }
    }
}