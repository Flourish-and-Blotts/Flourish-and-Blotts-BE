import { Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../controllers/AuthenticateController";
import CustomError from '../class/CustomError'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]??''; // Bearer <token>
    try {
        if (!isAuthenticated(token)) {
            res.status(403);
            res.json({message: 'user is not authenticated'});
        }
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }

    next();
}

export const errorHandler =  (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    // Handle validation errors
  if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message });
  }

  // Fallback for unexpected errors
  res.status(500).json({ error: err.message });
}
