import jwt from "jsonwebtoken";
import {User} from "../models/UsersModel.js";
export const isAuth =async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    try {
        const decoded =await jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        const user =await User.findById(decoded.id);
        console.log(user)
        if (!user) {
            return res.status(500).json({success:false, message: "Authorization denied" });
        }
        req.user = user;
        next();
    } catch (error) {
        //(error);
        res.status(400).json({ message: "Token is not valid" });
    }
}