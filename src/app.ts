import sequelize from "./database/Database.ts";
import express from "express";
import usersRouter from "./routes/UsersRoutes.ts";
import authRouter from "./routes/AuthRoutes.ts";
import session from "express-session";
import audiosRouter from "./routes/AudiosRoutes.ts";
import wordsRoutes from "./routes/WordRoutes.ts";
import categoryRouter from "./routes/CategoryRoutes.ts";
import subcategoriesRouter from "./routes/SubcategoryRoutes.ts";
import { bypassLogin, checkIfAdmin, checkIfLoggedIn } from "./routes/Middlewares.ts";
import adminRouter from "./routes/AdminRoutes.ts";


const app = express();

try {
  await sequelize.authenticate();
  console.log("Banco de dados iniciado com sucesso.");
} catch (error) {
  console.error("Erro na inicialização do banco de dados:", error);
}

app.set("view engine", "ejs");

app.use(session({
  secret: "TESTE",
  resave: false,
  saveUninitialized: false,
}));

app.use('/public', express.static('public'));
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/audios", audiosRouter);
app.use("/words", wordsRoutes);
app.use("/category", categoryRouter);
app.use("/subcategory", subcategoriesRouter);
app.use("/admin", adminRouter);

app.get("/", checkIfLoggedIn, (req, res) => {
    res.render("home");
});

app.listen(process.env.PORT, () => {
  console.log("Server rodando na porta " + process.env.PORT);
});
