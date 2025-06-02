import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/database";

// Importação das rotas
import loginRoutes from "./routes/loginRoutes";
import userRoutes from "./routes/userRoutes";
import carRoutes from "./routes/carRoutes";
import brandRoutes from "./routes/brandRoutes";

const app = express();

// Middlewares
app.use(cors()); // Aqui entra a configuração do CORS
app.use(bodyParser.json());

// Rotas
app.use(loginRoutes);
app.use(userRoutes);
app.use(carRoutes);
app.use(brandRoutes);

// Testando conexão com banco
sequelize
  .authenticate()
  .then(() => console.log("Banco de dados conectado!"))
  .catch((err) => console.error("Erro ao conectar ao banco", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
