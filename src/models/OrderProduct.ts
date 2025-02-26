import { DataTypes, Model } from "sequelize";
import sequelize from '../utils/DB';
import Order from "./Order";
import Product from "./Product";

class OrderProduct extends Model {
    id!: number;
    orderId!: number;
    productId!: number;
    quantity!: number;
}

OrderProduct.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    orderId: {
        type: DataTypes.INTEGER,
        references: { model: Order, key: "id" },
        onDelete: "CASCADE",
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        references: { model: Product, key: "id" },
        onDelete: "CASCADE",
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Default to 1 quantity per product in order
    },
}, {
    sequelize,
    tableName: 'order_products',
    timestamps: true,
});

export default OrderProduct;
