import {Request, Response} from "express";
import {Repository} from "typeorm";
import {hash, compare} from 'bcrypt'
import {validationResult} from "express-validator";
import { sign } from "jsonwebtoken";
import {User} from "../entities";
import {AppDataSource} from "../data-source";

export class AuthController {

    private userRepository: Repository<User>
    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    async login(req: Request, res: Response) {
        const user = await this.userRepository.findOneBy({
            email: req.body.email
        })

        if ( !user ) {
            return res.status(404).send('User not found');
        }

        const isCorrectPassword = await compare(req.body.password, user.password);

        if ( isCorrectPassword ) {
            const token = sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                email: user.email,
                id: user.id
            }, 'secret');

            res.json({
                token
            })
        } else {
            return res.status(401).send('Incorrect password');
        }
    }

    async register(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = new User()
        user.email = req.body.email
        user.password = await hash(req.body.password, 10)

        await this.userRepository.save(user)
        res.status(201).json(user);
    }
}