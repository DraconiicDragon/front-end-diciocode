import express from "express";
import { SubcategoryController } from "./Controllers/SubcategoriesController.ts";
import { checkIfAdmin, checkIfLoggedIn } from "./Middlewares.ts";

const subcategoriesRouter = express.Router();
subcategoriesRouter.use(express.json({
    type: ['application/json', 'text/plain']
}));
subcategoriesRouter.use(checkIfLoggedIn);

subcategoriesRouter.get("/all", SubcategoryController.getSubcategories);
subcategoriesRouter.get("/id/:id", SubcategoryController.getSubcategoryById);
subcategoriesRouter.get("/name/:name", SubcategoryController.getSubcategoriesByName);
subcategoriesRouter.get("/words/:id_subcategory", SubcategoryController.getWordsBySubcategoryId);
subcategoriesRouter.get("/category/:id_category", SubcategoryController.getSubcategoriesByCategoryId)

subcategoriesRouter.post("/words", checkIfAdmin, SubcategoryController.addWordtoSubcategory);
subcategoriesRouter.post("/", checkIfAdmin, SubcategoryController.createSubcategory);
subcategoriesRouter.patch("/", checkIfAdmin, SubcategoryController.updateSubcategory);
subcategoriesRouter.delete("/:id", checkIfAdmin, SubcategoryController.deleteSubcategory);
subcategoriesRouter.delete("/words/:id", checkIfAdmin, SubcategoryController.removeWordFromSubcategory);

export default subcategoriesRouter;