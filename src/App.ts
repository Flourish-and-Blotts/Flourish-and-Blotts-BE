import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import ShopRoute from './routers/ShopRouter'
import UserRoute from './routers/UserRoute'
import AdminRoute from './routers/adminRouter'
import sequelize from './utils/DB'
import { errorHandler } from './middlewares/common';
import cors from 'cors';
import { verifyToken } from './middlewares/common';

dotenv.config();

const app = express();

app.use(express.json());  // Middleware to parse JSON

const corsOptions = {
    origin: ['http://localhost:5173'], // Allow specific origins
    methods: ['GET', 'POST'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Custom headers
    credentials: true, // Allow cookies
};
app.use(cors(corsOptions));

app.use(ShopRoute);
app.use(UserRoute);
app.use('/admin', verifyToken, AdminRoute);
app.use(errorHandler);
app.use('/', (req, res, next) => {
    res.send('404 not found');
})
sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced.');
    app.listen(process.env.PORT, () => {
        console.log(`running at ${process.env.PORT}`)
    })
});

