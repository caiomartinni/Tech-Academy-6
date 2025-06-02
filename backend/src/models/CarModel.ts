import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import BrandModel from "./BrandModel";

class CarModel extends Model {
  id!: number;
  model!: string;
  description!: string;
  specs!: string;
  averagePrice!: number;
  type!: string;
  year!: number;
  brandId!: number;
}

CarModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    specs: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    averagePrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CarModel",
    tableName: "cars",
  }
);

CarModel.belongsTo(BrandModel, {
  foreignKey: "brandId",
  as: "brand",
});

BrandModel.hasMany(CarModel, {
  foreignKey: "brandId",
  as: "cars",
});

export default CarModel;
