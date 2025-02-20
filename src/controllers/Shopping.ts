import { Product, Author } from "../models/index";
import { Op } from 'sequelize';
import { Request, Response, NextFunction } from "express";

export const getAllProduct = (req: Request, res: Response, next: NextFunction) => {
  const searchText = req.query.searchText ?? '';
  const page = parseInt(req.query.page as string) || 1; // Default to page 1 if not provided
  const pageSize = parseInt(req.query.limit as string) || 10; // Default to 10 items per page if not provided
  const offset = (page - 1) * pageSize;
  Product.findAll({
    where: {
        title: { [Op.iLike]: `%${searchText}%` },  // Title containing 'Tech'
      },
    limit: pageSize,
    offset: offset,
    include: {
      model: Author,
      attributes: ['name'], // Select specific fields
    },
  }).then(products => {
    res.json(products);
  });
}

export const getProductById = (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.id
  Product.findByPk(productId).then(products => {
    res.status(201).json({ message: 'author created successfully', data: products });
  }).catch(err =>
    next(err)
  );
}