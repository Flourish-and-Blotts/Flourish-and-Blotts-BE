import express from 'express';
import { getAllProduct, getProductById } from '../controllers/Shopping';

const router = express.Router();

router.get("/getAllProduct", getAllProduct)
router.get("/product/:id", getProductById)

export default router;