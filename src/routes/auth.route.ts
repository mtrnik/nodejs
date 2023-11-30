import { Router, Request, Response } from 'express';
import {AuthController} from "../controllers";
import {body} from "express-validator";

export const authRouter = Router();

const authController = new AuthController()

const registerValidationRules = [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid'),
    body('password').notEmpty().withMessage('Password is required'),
];

authRouter.post('/login', async (req: Request, res: Response) => authController.login(req, res));
authRouter.post('/register', registerValidationRules, async (req: Request, res: Response) => authController.register(req, res));
