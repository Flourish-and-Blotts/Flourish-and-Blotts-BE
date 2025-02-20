import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/DB';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
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
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
