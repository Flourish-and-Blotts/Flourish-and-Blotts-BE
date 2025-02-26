import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../utils/DB';
import Product from "./Product";
import OrderProduct from "./OrderProduct";  // Import OrderProduct model
import User from "./User";

interface OrderAttributes {
    id: number;
    userId: string;
    totalPrice: number;
    location?: string;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> { }

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    id!: number;
    userId!: string;
    totalPrice!: number;
    location?: string;
}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
          },
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,  // Optional field
    },
}, {
    sequelize,
    tableName: 'orders',
    timestamps: true,
});

export default Order;