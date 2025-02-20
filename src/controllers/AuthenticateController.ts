import dotEnv from 'dotenv';
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotEnv.config();
const JWT_SECRET = process.env.JWT_SECRET ?? 'key';

export const isAuthenticated = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
}

export const registerUser = async (username: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({ username, password: hashedPassword });
};

export const login = async (username: string, password: string) => {
    const user = await User.findOne({ where: { username } });

    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: "1h",
    });

    return { message: "Login successful", token };
}
