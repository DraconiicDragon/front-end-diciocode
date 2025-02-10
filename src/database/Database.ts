import { readdirSync } from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { fileURLToPath } from "url";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT || "3306"),
  logging: (msg) => {
    console.log(msg);
  },
});

async function loadModels() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const files = readdirSync(path.join(__dirname, "./models")).filter((file) =>
    file.endsWith(".ts")
  );
  for (const file of files) {
    await import(`./models/${file}`);
  }
}

(async () => {
  try {
    await loadModels();
    await sequelize.sync();
  } catch (error) {
    console.error("Erro na sincronização com o banco de dados:", error);
  }
})();

export default sequelize;
