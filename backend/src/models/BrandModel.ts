import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class BrandModel extends Model {
  id!: number;
  name!: string;
}

BrandModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "BrandModel",
    tableName: "brands",
  }
);

export default BrandModel;
