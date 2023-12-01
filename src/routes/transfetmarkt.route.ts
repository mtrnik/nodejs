import { Router, Request, Response } from 'express';
import {AuthController, TransfermarktController} from "../controllers";
import {body} from "express-validator";

export const transfermarktRouter = Router();

const transfermarktController = new TransfermarktController()

transfermarktRouter.get('/match/:id', transfermarktController.match.bind(transfermarktController))