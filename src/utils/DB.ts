import dotEnv from 'dotenv';
import {Sequelize} from 'sequelize';

dotEnv.config();

const sequelize = new Sequelize(process.env.DB_NAME??'', process.env.DB_USER ??'', process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres', // Change this to match your database: 'mysql', 'sqlite', etc.
    logging: console.log, // Disable SQL query logging (optional)
    define: {
        schema: process.env.DB_SCHEMA, // Set default schema
      },
  });

export default sequelize;