import { Product, Author } from "../models/index";
import { Request, Response, NextFunction } from "express";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.create({ title: req.body.title, price: Number(req.body.price), authorId: req.body.authorId, imageUrl: req.body.imageUrl });
        res.status(201).json({ message: 'product created successfully', data: product });
    } catch (error) {
        next(error);
    }
}

export const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = await Author.create({ name: req.body.name, bio:req.body.bio });
        res.status(201).json({ message: 'author created successfully', data: author });
    } catch (error) {
        next(error);
    }
}