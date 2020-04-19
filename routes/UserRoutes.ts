import {Router, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import dateformat from 'dateformat';
import User from '../models/User';
import ProfilePicture from '../models/ProfilePicture';
import {JWT_SECRET_KEY} from '../src/constants';
import UserAddress from "../models/UserAddress";

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
            role,
        } = req.body;

        await bcrypt.hash(password, 10, async (err: any, hash: string) => {
            const user = new User({
                firstName,
                lastName,
                email,
                password: hash,
                createdAt: new Date(),
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

                    const registeredUser = {
                        _id: savedUser.id,
                        firstName: savedUser.firstName,
                        lastName: savedUser.lastName,
                        email: savedUser.email,
                        role: savedUser.role,
                    };

                    res.send({
                        token,
                        refreshToken,
                        user: registeredUser,
                    }).status(200);
                }
            });
        });
    }

    public async login(req: Request, res: Response): Promise<void> {
        const {email, password} = req.body;

        try {
            const user = await User.findOne({email});

            if (user){
                const result = await user.validPassword(password);

                if (result){
                    const newUser = {
                        email: user.email,
                        password: user.password,
                    };

                    const address = await UserAddress.findOne({user: user.id, default: true});

                    const sentUser = {
                        _id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role,
                        address,
                        createdAt: user.createdAt,
                    };

                    const token = await jwt.sign(newUser, JWT_SECRET_KEY, {
                        expiresIn: '1h',
                    });

                    const refreshToken = await jwt.sign(newUser, JWT_SECRET_KEY);

                    res.json({token, refreshToken, user: sentUser}).status(200);
                } else {
                    res.json({message: "Password is wrong."}).status(401);
                }
            } else {
                res.json({message: "There is not such a user."}).status(401);
            }
        } catch (err){
            console.log(err);
        }

        // await User.findOne({email}, async (err: any, user: any) => {
        //     if (!err) {
        //         await bcrypt.hash(password, 10, (err: any, hash: string) => {
        //             console.log("Üretilen hash: ", hash);
        //             if (!err) {
        //                 bcrypt.compare(hash, user.password)
        //                     .then(async response => {
        //                         console.log("Cevap: ", response);
        //                         if (response) {
        //                             const newUser = {
        //                                 email: user.email,
        //                                 password: user.password,
        //                             };
        //
        //                             const sentUser = {
        //                                 _id: user.id,
        //                                 firstName: user.firstName,
        //                                 lastName: user.lastName,
        //                                 email: user.email,
        //                                 role: user.role,
        //                             };
        //
        //                             const token = await jwt.sign(newUser, JWT_SECRET_KEY, {
        //                                 expiresIn: '1h',
        //                             });
        //
        //                             const refreshToken = await jwt.sign(newUser, JWT_SECRET_KEY);
        //
        //                             res.json({token, refreshToken, user: sentUser}).status(200);
        //                         } else {
        //                             res.json({message: "Password is wrong."}).status(401);
        //                         }
        //                     })
        //                     .catch(() => res.json({message: "Password is wrong."}).status(401));
        //             } else {
        //                 res.json({message: "Password has not been bcrypted."}).status(401);
        //             }
        //         });
        //     } else {
        //         res.json({message: "There is not such a user."}).status(401);
        //     }
        // });
    }

    // public async createToken(user) {
    //     try {
    //         const token = await jwt.sign(user, JWT_SECRET_KEY, {
    //             expiresIn: '1h',
    //         });
    //
    //         const refreshToken = await jwt.sign(user, JWT_SECRET_KEY);
    //
    //         return {
    //             token,
    //             refreshToken,
    //         };
    //     } catch (error){
    //         console.log(error);
    //     }
    // }

    public async refreshToken(req: Request, res: Response): Promise<void> {
        const {token} = req.body;

        await jwt.verify(token, JWT_SECRET_KEY, async (err: any, user: any) => {
            if (!err) {
                const validatedUser = {
                    email: user.email,
                    password: user.password,
                };

                const token = await jwt.sign(validatedUser, JWT_SECRET_KEY, {
                    expiresIn: '1h',
                });

                const refreshToken = await jwt.sign(validatedUser, JWT_SECRET_KEY);

                const tokens = {
                    token,
                    refreshToken,
                };

                res.send(tokens);
            } else {
                res.send(err).status(401);
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
