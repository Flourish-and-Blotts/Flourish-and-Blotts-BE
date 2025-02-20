import express from 'express';
import { createAuthor, createProduct } from '../controllers/AdminController';


const router = express.Router();

router.post("/author/create", createAuthor)

router.post("/product/create",createProduct);

export default router;