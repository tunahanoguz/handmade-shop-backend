import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import {authMiddleware} from "./authMiddleware";

import UserRoutes from "../routes/UserRoutes";
import ProductRoutes from '../routes/ProductRoutes';
import ProductCommentRoutes from '../routes/ProductCommentRoutes';
import RoleRoutes from '../routes/RoleRoutes';
import StoreRoutes from '../routes/StoreRoutes';
import ProductCategoryRoutes from '../routes/ProductCategoryRoutes';
import UserAddressRoutes from '../routes/UserAddressRoutes'
import UserCreditCardRoutes from '../routes/UserCreditCardRoutes'

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config(): void {
        const MONGO_URL = 'mongodb://localhost:27017/handmade_shop';
        mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        this.app.set('port', process.env.PORT || 5000);
        this.app.use(bodyParser.json());
        this.app.use('/uploads', express.static('uploads'));
        this.app.use(cors());
    }

    public routes(): void {
        const router: express.Router = express.Router();

        this.app.use('/auth', UserRoutes);
        this.app.use('/product', authMiddleware, ProductRoutes);
        this.app.use('/product-comment', authMiddleware, ProductCommentRoutes);
        this.app.use('/role', authMiddleware, RoleRoutes);
        this.app.use('/store', authMiddleware, StoreRoutes);
        this.app.use('/category', authMiddleware, ProductCategoryRoutes);
        this.app.use('/user-address', authMiddleware, UserAddressRoutes);
        this.app.use('/user-credit-card', authMiddleware, UserCreditCardRoutes);
    }

    public start(): void {
        const PORT = this.app.get('port');
        this.app.listen(PORT, () => {
            console.log(`App is running on ${PORT}`);
        });
    }
}

const app = new App();
app.start();

export default app;
