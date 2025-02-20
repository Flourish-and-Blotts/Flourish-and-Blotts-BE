import Author from './Author';
import Product from './Product';

// One Author has many Products
Author.hasMany(Product, { foreignKey: 'authorId' });

// One Product belongs to one Author
Product.belongsTo(Author, { foreignKey: 'authorId' });

export { Author, Product };