import Author from './Author';
import Order from './Order';
import OrderProduct from './OrderProduct';
import Product from './Product';
import User from './User';

// One Author has many Products
Author.hasMany(Product, { foreignKey: 'authorId' });

// One Product belongs to one Author
Product.belongsTo(Author, { foreignKey: 'authorId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.belongsToMany(Product, { through: OrderProduct, foreignKey: "orderId" });
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: "productId" });

export { Author, Product };