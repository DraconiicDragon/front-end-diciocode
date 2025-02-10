import express from "express";
import { checkIfAdmin, checkIfLoggedIn } from "./Middlewares.ts";

const adminRouter = express.Router();
adminRouter.use(express.json());

adminRouter.use(checkIfLoggedIn, checkIfAdmin,);

adminRouter.get("/", (req, res) => {
    res.render("admin");
});
adminRouter.get("/categories", (req, res) => {
    res.render("adminCategories");
});
adminRouter.get("/category", (req, res) => {
    res.render("adminEditCategory");
});
adminRouter.get("/subcategories", (req, res) => {
    res.render("adminSubcategories");
});
adminRouter.get("/subcategory", (req, res) => {
    res.render("adminEditSubcategory");
});
adminRouter.get("/words", (req, res) => {
    res.render("adminWords");
});
adminRouter.get("/word", (req, res) => {
    res.render("adminEditWord");
});
adminRouter.get("/users", (req, res) => {
    res.render("adminUsers");
});

export default adminRouter;