import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import {authMiddleware} from "./authMiddleware";

import UserRoutes from "../routes/UserRoutes";
import ProductRoutes from '../routes/ProductRoutes';
import ProductPictureRoutes from '../routes/ProductPictureRoutes';
import ProductFavoriteRoutes from '../routes/ProductFavoriteRoutes';
import ProductCommentRoutes from '../routes/ProductCommentRoutes';
import ProductScoreRoutes from '../routes/ProductScoreRoutes';
import ProductGenderRoutes from '../routes/ProductGenderRoutes';
import ProductTypeRoutes from '../routes/ProductTypeRoutes';
import OrderRoutes from '../routes/OrderRoutes'
import RoleRoutes from '../routes/RoleRoutes';
import StoreRoutes from '../routes/StoreRoutes';
import StoreFavoriteRoutes from '../routes/StoreFavoriteRoutes';
import StoreCommentRoutes from '../routes/StoreCommentRoutes';
import StoreScoreRoutes from '../routes/StoreScoreRoutes';
import ProductCategoryRoutes from '../routes/ProductCategoryRoutes';
import UserAddressRoutes from '../routes/UserAddressRoutes';
import UserCreditCardRoutes from '../routes/UserCreditCardRoutes';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config(): void {
        this.app.use(cors());
        const MONGO_URL = 'mongodb://localhost:27017/handmade_shop';
        mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        this.app.set('port', process.env.PORT || 5000);
        this.app.use(bodyParser.json());
        this.app.use('/uploads', express.static('uploads'));
    }

    public routes(): void {
        const router: express.Router = express.Router();

        this.app.use('/auth', UserRoutes);
        this.app.use('/product', authMiddleware, ProductRoutes);
        this.app.use('/product-picture', authMiddleware, ProductPictureRoutes);
        this.app.use('/product-favorite', authMiddleware, ProductFavoriteRoutes);
        this.app.use('/product-comment', authMiddleware, ProductCommentRoutes);
        this.app.use('/product-score', authMiddleware, ProductScoreRoutes);
        this.app.use('/product-gender', authMiddleware, ProductGenderRoutes);
        this.app.use('/product-type', authMiddleware, ProductTypeRoutes);
        this.app.use('/order', authMiddleware, OrderRoutes);
        this.app.use('/role', authMiddleware, RoleRoutes);
        this.app.use('/store', authMiddleware, StoreRoutes);
        this.app.use('/store-favorite', authMiddleware, StoreFavoriteRoutes);
        this.app.use('/store-comment', authMiddleware, StoreCommentRoutes);
        this.app.use('/store-score', authMiddleware, StoreScoreRoutes);
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
