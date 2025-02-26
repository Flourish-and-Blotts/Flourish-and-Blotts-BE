import express from 'express';
import { createAuthor, createProduct, deleteProduct, getAuthor, updateProduct } from '../controllers/AdminController';


const router = express.Router();

router.get("/author/getAll", getAuthor)
router.post("/author/create", createAuthor)
router.post("/product/create", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;