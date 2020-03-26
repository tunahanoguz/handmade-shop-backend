import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import {JWT_SECRET_KEY} from "./constants";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, JWT_SECRET_KEY, (err, auth) => {
            if (err){
                res.status(403).json({ message: 'Forbidden.' });
            }
            else {
                next();
            }
        });

    } else {
        res.status(403).json({ message: 'Forbidden.' });
    }
};
