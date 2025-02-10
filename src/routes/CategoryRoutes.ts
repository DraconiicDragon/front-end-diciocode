import express from "express";
import { CategoryController } from "./Controllers/CategoryController.ts";
import { checkIfAdmin, checkIfLoggedIn } from "./Middlewares.ts";

const categoryRouter = express.Router();
categoryRouter.use(express.json({
    type: ['application/json', 'text/plain']
}));

categoryRouter.use(checkIfLoggedIn);
categoryRouter.get("/", (req, res) => {
    res.render("category");
});
categoryRouter.get("/subcategory", (req, res) => {
    res.render("subcategory");
});
categoryRouter.get("/all", CategoryController.getCategories);
categoryRouter.get("/id/:id", CategoryController.getCategoryById);
categoryRouter.get("/name/:name", CategoryController.getCategoriesByName);

categoryRouter.post("/", checkIfAdmin, CategoryController.createCategory);
categoryRouter.patch("/", checkIfAdmin, CategoryController.updateCategory);
categoryRouter.delete("/:id", checkIfAdmin, CategoryController.deleteCategory);

export default categoryRouter;