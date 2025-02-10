import express from "express";
import { bypassLogin, checkIfLoggedIn } from "./Middlewares.ts";
import { AuthController } from "./Controllers/AuthController.ts";

const authRouter = express.Router();
authRouter.use(express.json({
    type: ['application/json', 'text/plain']
}));

authRouter.get("/login", bypassLogin, (req, res) => {
    res.render("login");
})
authRouter.get("/register", bypassLogin, (req, res) => {
    res.render("register");
});
authRouter.get("/logout", checkIfLoggedIn, AuthController.logout, (req, res) => {
    res.redirect("/auth/login");
});

authRouter.post("/login", bypassLogin, AuthController.login);
authRouter.post("/register", bypassLogin, AuthController.register);

 
export default authRouter;