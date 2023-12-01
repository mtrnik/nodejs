import { Request, Response } from 'express';
import { ValidationError } from "express-validator";

export interface RequestExtended<PARAMS = unknown, BODY = unknown> extends Request<PARAMS> {
    body: BODY;
}

export interface ResponseExtended<T> extends Response<T | {errors: ValidationError[] }| string> {}