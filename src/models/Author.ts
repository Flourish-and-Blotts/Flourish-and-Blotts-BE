import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/DB';

interface AuthorAttributes {
  id: number;
  name: string;
  bio?: string;
}

interface AuthorCreationAttributes extends Optional<AuthorAttributes, 'id'> { }

class Author extends Model<AuthorAttributes, AuthorCreationAttributes> implements AuthorAttributes {
  public id!: number;
  public name!: string;
  public bio?: string;
}

Author.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
}, {
  sequelize,
  tableName: 'authors',
  timestamps: true,
});

export default Author;