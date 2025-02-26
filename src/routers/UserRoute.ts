import { Router, Request, Response, NextFunction } from "express";
import { login, registerUser } from "../controllers/AuthenticateController";
import { verifyToken } from "../middlewares/common";
import ExpressValidator from 'express-validator';
// import { body, validationResult } from "express-validator";

const router = Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await login(username, password);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});

router.post("/users/create", [
    // body('username')
    //     .isString()
    //     .notEmpty()
    //     .withMessage('Username is required'),
    // body('password')
    //     .isLength({ min: 6 })
    //     .withMessage('Password must be at least 6 characters long'),
], async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     res.status(400).json({ errors: errors.array() });
    // }

    try {
        const newUser = await registerUser(username, password);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        next(error);
    }
});

export default router;