import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/DB';
import Author from './Author';
import Order from './Order';
import OrderProduct from './OrderProduct';

interface ProductAttributes {
  id: number;
  title: string;
  price: number;
  authorId: number;
  imageUrl?: string;
  description?: string
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> { }

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public title!: string;
  public price!: number;
  public authorId!: number;
  public imageUrl!: string;
  description?: string
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Author,
      key: 'id',
    },
  },
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: ''
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
}, {
  sequelize,
  tableName: 'products',
  timestamps: true,
});

export default Product;
