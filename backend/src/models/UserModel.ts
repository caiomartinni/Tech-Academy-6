import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcrypt";

class UserModel extends Model {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  cpf!: string;
  updatedBy?: number;

  public async hashPassword() {
    this.password = await bcrypt.hash(this.password!, 10);
  }

  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password!);
  }

  public static validateCPF(cpf: string): boolean {
    return validateCPF(cpf);
  }
}

export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  const calcDV = (slice: number): number => {
    let sum = 0;
    for (let i = 0; i < slice; i++) {
      sum += parseInt(cpf[i]) * (slice + 1 - i);
    }
    let remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  return calcDV(9) === parseInt(cpf[9]) && calcDV(10) === parseInt(cpf[10]);
};

UserModel.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValidCPF(value: string) {
          if (!UserModel.validateCPF(value)) {
            throw new Error("CPF inválido");
          }
        },
      },
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "UserModel",
    tableName: "users",
  }
);

UserModel.beforeCreate(async (user: UserModel) => {
  await user.hashPassword();
});

UserModel.beforeUpdate(async (user: UserModel) => {
  if (user.changed("password")) {
    await user.hashPassword();
  }
});

export default UserModel;
