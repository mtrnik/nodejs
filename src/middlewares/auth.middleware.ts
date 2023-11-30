import {verify} from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization = req.headers?.authorization ?? ''
        const token = authorization.split(' ')[1]
        verify(token, 'secret');

        next();
    } catch(err) {
        console.error('error', err)
        res.status(403).send('Expired token')
    }
}