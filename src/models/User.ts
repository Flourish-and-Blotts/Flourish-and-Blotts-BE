import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/DB';

export enum USER_ROLE {
  ADMIN = 'admin',
  NORMAL_USER = 'user'
}
class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public role?: USER_ROLE
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 128], // Password length validation
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: USER_ROLE.NORMAL_USER
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
