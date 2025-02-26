import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import ShopRoute from './routers/ShopRouter'
import UserRoute from './routers/UserRoute'
import AdminRoute from './routers/AdminRouter'
import sequelize from './utils/DB'
import { errorHandler } from './middlewares/common';
import cors from 'cors';
import { verifyToken, authorizeToken } from './middlewares/common';
import { USER_ROLE } from './models/User';

dotenv.config();

const app = express();

app.use(express.json());  // Middleware to parse JSON

const corsOptions = {
  origin: ['http://54.166.119.55:3000'], // Allow specific origins
  methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Custom headers
  credentials: true, // Allow cookies
};
app.use(cors(corsOptions));

declare global {
  namespace Express {
    interface Request {
      user?: { id: string, username: string, role: string }
    }
  }
}

app.use(ShopRoute);
app.use(UserRoute);
app.use('/admin', verifyToken, authorizeToken([USER_ROLE.ADMIN]), AdminRoute);
app.use(errorHandler);
app.use('/', (req, res, next) => {
  res.status(404).json('404 not found');
})
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced.');
  app.listen(process.env.PORT, () => {
    console.log(`running at ${process.env.PORT}`)
  })
});

