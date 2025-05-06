import jwt from 'jsonwebtoken';
import {  ACCESS_TOKEN_SECRET } from '../config/serverConfig.js';
import User from '../models/user.models.js';

export const isLoggedIn = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer ", "");
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token Missing or Unauthorized",
            })
        }

        // verify the token 
            const decode = jwt.verify(token, ACCESS_TOKEN_SECRET);

            const user = await User.findById(decode?._id);
            if(!user){
                return res.status(401).json({
                    success: false,
                    message: "Invalid Access Token",
                })
            }

        req.user = decode;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: ["Unauthorized", error.message]
        })
    }
}