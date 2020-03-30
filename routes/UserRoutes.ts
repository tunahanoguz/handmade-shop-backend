import {Router, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import dateformat from 'dateformat';
import User from '../models/User';
import ProfilePicture from '../models/ProfilePicture';
import {JWT_SECRET_KEY} from '../src/constants';

class UserRoutes {
    router: Router;
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/profilePicture');
        },
        filename: function (req, file, cb) {
            cb(null, dateformat(new Date(), "dd-mm-yyyy-hh-MM-ss") + '-' + file.originalname);
        }
    });
    upload = multer({storage: this.storage});

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async register(req: Request, res: Response): Promise<void> {
        const {
            firstName,
            lastName,
            email,
            password,
            createdAt,
            role,
        } = req.body;

        await bcrypt.hash(password, 10, async (err: any, hash: string) => {
            const user = new User({
                firstName,
                lastName,
                email,
                password: hash,
                createdAt,
                role,
            });

            const token = await jwt.sign(user.toJSON(), JWT_SECRET_KEY, {
                expiresIn: '1h',
            });

            const refreshToken = await jwt.sign(user.toJSON(), JWT_SECRET_KEY);

            await user.save(async (err: any, savedUser: any) => {
                if (err) {
                    res.send(err).status(400);
                } else {
                    if (req.file) {
                        const profilePicture = new ProfilePicture({
                            name: req.file.filename,
                            user: savedUser
                        });

                        await profilePicture.save();
                    }

                    res.send({
                        token,
                        refreshToken,
                    }).status(200);
                }
            });
        });
    }

    public async login(req: Request, res: Response): Promise<void> {
        const {email, password} = req.body;

        await User.findOne({email}, async (err: any, user: any) => {
            if (!err) {
                await bcrypt.hash(password, 10, async (err: any, hash: string) => {
                    if (!err) {
                        await bcrypt.compare(user.password, hash, async (err, r) => {
                            if (!err) {
                                const token = await jwt.sign(user.toJSON(), JWT_SECRET_KEY, {
                                    expiresIn: '1h',
                                });

                                const refreshToken = await jwt.sign(user.toJSON(), JWT_SECRET_KEY);

                                res.json({token, refreshToken}).status(200);
                            } else {
                                res.json({message: "Password is wrong."}).status(301);
                            }
                        });
                    } else {
                        res.json({message: "Password has not been bcrypted."}).status(301);
                    }
                });
            } else {
                res.json({message: "There is not such a user."}).status(301);
            }
        });
    }

    public async createToken(user): Promise<object> {
        const token = await jwt.sign(user, JWT_SECRET_KEY, {
            expiresIn: '1h',
        });

        const refreshToken = await jwt.sign(user, JWT_SECRET_KEY);

        return {
            token,
            refreshToken,
        };
    }

    public async refreshToken(req: Request, res: Response): Promise<void> {
        const {token} = req.body;

        jwt.verify(token, JWT_SECRET_KEY, (err: any, user: any) => {
            if (!err) {
                const tokens = this.createToken(user);
                res.send(tokens).status(200);
            } else {
                res.send(err).status(403)
            }
        });
    }

    routes() {
        this.router.post('/register', this.upload.single('profilePicture'), this.register);
        this.router.post('/login', this.login);
        this.router.post('/refresh-token', this.refreshToken);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
