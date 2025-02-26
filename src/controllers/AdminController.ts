import { Product, Author } from "../models/index";
import { Request, Response, NextFunction } from "express";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.create({
            title: req.body.title, price: Number(req.body.price), authorId: req.body.authorId,
            imageUrl: req.body.imageUrl, description: req.body.description
        });
        res.status(201).json({ message: 'product created successfully', data: product });
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id
    try {
        const product = await Product.update({ title: req.body.title, price: Number(req.body.price), authorId: req.body.authorId, imageUrl: req.body.imageUrl,
            description: req.body.description
         }, {
            where: { id: productId },
            returning: true
        });
        res.status(201).json({ message: 'product updated successfully', data: product });
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id
    try {
        const product = await Product.destroy({
            where: { id: productId }
        });
        res.status(201).json({ message: 'product deleted successfully', data: productId });
    } catch (error) {
        next(error);
    }
}

export const getAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = await Author.findAll();
        res.status(201).json({ message: 'get Author success', data: author });
    } catch (error) {
        next(error);
    }
}

export const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = await Author.create({ name: req.body.name, bio: req.body.bio });
        res.status(201).json({ message: 'author created successfully', data: author });
    } catch (error) {
        next(error);
    }
}

export const updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.body.id
    try {
        const product = await Author.update({ name: req.body.name, bio: req.body.bio }, {
            where: { id: authorId },
            returning: true
        });
        res.status(201).json({ message: 'Author updated successfully', data: product });
    } catch (error) {
        next(error);
    }
}

export const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id
    try {
        const product = await Author.destroy({
            where: { id: id }
        });
        res.status(201).json({ message: 'product deleted successfully', data: id });
    } catch (error) {
        next(error);
    }
}