import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isTest = process.env.NODE_ENV === "test";

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: !isTest,
  }
);

if (!isTest) {
  (async () => {
    try {
      await sequelize.sync({ alter: true });
      console.log("Banco de dados sincronizado.");
    } catch (error) {
      console.error("Erro ao sincronizar o banco de dados:", error);
    }
  })();
}

export default sequelize;
