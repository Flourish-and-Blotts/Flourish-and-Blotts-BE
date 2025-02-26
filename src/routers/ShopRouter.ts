import express from 'express';
import { createOrder, getAllOrder, getAllProduct, getProductById, deleteOrder } from '../controllers/ShoppingController';
import { verifyToken } from '../middlewares/common';

const router = express.Router();

router.get("/getAllProduct", getAllProduct)
router.get("/product/:id", getProductById)
router.post("/order", verifyToken , createOrder)
router.get("/order", verifyToken , getAllOrder)
router.delete("/order/:id", verifyToken , deleteOrder)

export default router;