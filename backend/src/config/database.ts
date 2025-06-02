import { Sequelize } from "sequelize";

const sequelize = new Sequelize("cartalogo", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
