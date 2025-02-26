import dotEnv from 'dotenv';
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { USER_ROLE } from '../models/User';

dotEnv.config();
const JWT_SECRET = process.env.JWT_SECRET ?? 'key';

export const isAuthenticated = (token: string) => {
    if (!token) {
        throw new Error("Invalid token");
    }
    return jwt.verify(token, process.env.JWT_SECRET!);
}

export const isAuthorized = (role: USER_ROLE, roles: USER_ROLE[] = [USER_ROLE.NORMAL_USER]): boolean => {
    return roles.includes(role)
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
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, {
        expiresIn: "2h",
    });

    return { message: "Login successful", token, role: user.role, username: user.username };
}
