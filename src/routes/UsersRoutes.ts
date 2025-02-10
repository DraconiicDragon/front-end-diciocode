import express from "express";
import { UsersController } from "./Controllers/UsersController.ts";
import { checkIfAdmin, checkIfLoggedIn, checkIfSameUser } from "./Middlewares.ts";

const usersRouter = express.Router();
usersRouter.use(express.json());
usersRouter.use(checkIfLoggedIn);

usersRouter.get("/", checkIfAdmin, UsersController.getUsers);
usersRouter.get("/id/:id", checkIfSameUser, UsersController.getUserById);
usersRouter.get("/email/:email", checkIfAdmin, UsersController.getUserByEmail);
usersRouter.get("/name/:name", checkIfAdmin, UsersController.getUsersByName);

usersRouter.patch("/", checkIfAdmin, UsersController.updateUser);
usersRouter.patch("/password", checkIfAdmin, UsersController.updatePassword);
usersRouter.delete("/:id", checkIfAdmin, UsersController.deleteUser);

export default usersRouter;
