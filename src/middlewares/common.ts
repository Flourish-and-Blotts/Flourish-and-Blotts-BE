import { Request, Response, NextFunction } from "express";
import { isAuthenticated, isAuthorized } from "../controllers/AuthenticateController";
import CustomError from '../class/CustomError'
import { USER_ROLE } from "../models/User";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1] ?? ''; // Extract Bearer token

    try {
        const decoded = isAuthenticated(token) as { id: string; username: string; role: string };

        if (!decoded) {
            res.status(403).json({ message: 'Forbidden: Access denied' });
            return;
        }

        req.user = decoded;
    } catch (error: any) {
        res.status(401).json({ error: error.message });
        return;
    }

    next();
    return; // Explicitly returning to indicate function end
};

export const authorizeToken = (validRoles: USER_ROLE[]) => (req: Request, res: Response, next: NextFunction) => {
    if (!isAuthorized(req?.user?.role as USER_ROLE, validRoles)) {
        res.status(403);
        res.json({ message: 'Forbidden: Access denied' });
        return;
    }

    next();
}

export const errorHandler = (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    // Handle validation errors
    if (err.name === 'ValidationError') {
        res.status(400).json({ error: err.message });
    }

    // Fallback for unexpected errors
    res.status(500).json({ error: err.message });
}
