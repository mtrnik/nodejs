import {Request, Response} from "express";
import {Repository} from "typeorm";
import {hash, compare} from 'bcrypt'
import {User} from "../models";
import {AppDataSource} from "../data-source";
import {validationResult} from "express-validator";

export class AuthController {

    private userRepository: Repository<User>
    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    async login(req: Request, res: Response) {
        // const user = await this.userRepository.findOneBy({
        //     email: req.body.email
        // })
        //
        // if ( !user ) {
        //     res.status(404).send('User not found');
        // }
        //
        // await compare(req.body.password, user.password);
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