import { Product, Author } from "../models/index";
import { Op, Model } from 'sequelize';
import { Request, Response, NextFunction } from "express";
import Order from "../models/Order";
import OrderProduct from "../models/OrderProduct";

export const getAllProduct = (req: Request, res: Response, next: NextFunction) => {
  const searchText = req.query.searchText ?? '';
  const page = parseInt(req.query.page as string) || 1; // Default to page 1 if not provided
  const pageSize = parseInt(req.query.limit as string) || 10; // Default to 10 items per page if not provided
  const offset = (page - 1) * pageSize;
  Product.count({
    where: {
      title: { [Op.iLike]: `%${searchText}%` },  // Title containing 'Tech'
    },
  }).then((total: number) => {
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
      res.json({ data: products, currentPage: page, totalPage: Math.ceil(total / pageSize) });
    });
  })

}

export const getProductById = (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.id
  Product.findByPk(productId).then(products => {
    res.status(201).json({ message: 'author created successfully', data: products });
  }).catch(err =>
    next(err)
  );
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { location, products } = req.body;
  const userId = req?.user?.id ?? '';
  try {
    if (!products || products.length === 0) {
      res.status(400).json({ message: "At least one product is required" });
      return;
    }

    // Calculate total price
    let totalPrice = 0;
    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        res.status(404).json({ message: `Product with ID ${item.productId} not found` });
        return;
      }
      totalPrice += product.price * item.quantity;
    }

    // Create order
    const newOrder = await Order.create({
      userId,
      totalPrice,
      location,
    });

    // Add products to order
    for (const item of products) {
      await OrderProduct.create({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
      });
    }

    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    next(error);
  }
}

export const getAllOrder = (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1; // Default to page 1 if not provided
  const pageSize = parseInt(req.query.limit as string) || 10; // Default to 10 items per page if not provided
  const offset = (page - 1) * pageSize;
  const userId = req?.user?.id ?? '';
  Order.count({
    where: {
      userId: { [Op.eq]: userId },
    },
  }).then((total: number) => {
    Order.findAll({
      where: {
        userId: { [Op.eq]: userId },
      },
      limit: pageSize,
      offset: offset,
      include: [
        {
          model: Product,
          attributes: ['title', 'price', 'imageUrl'], // Select specific fields
          include: [{
            model: Author,
            attributes: ['name'], // Select specific fields
          }]
        }],
    }).then(products => {
      res.json({ data: products, currentPage: page, totalPage: Math.ceil(total / pageSize) });
    });
  })

}

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  try {
     await Order.destroy({
          where: { id: id }
      });
      res.status(201).json({ message: 'Order deleted successfully', data: id });
  } catch (error) {
      next(error);
  }
}