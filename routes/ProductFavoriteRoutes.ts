import {Router, Request, Response} from 'express';
import ProductFavorite from "../models/ProductFavorite";

class ProductFavoriteRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async create(req: Request, res: Response): Promise<void> {
        const favorite = new ProductFavorite(req.body);

        try {
            const savedFavorite = await favorite.save();
            res.send(savedFavorite);
        } catch (err) {
            res.send(err);
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        const {productID} = req.params;

        try {
            const favorites = await ProductFavorite.find({product: productID}).populate('user', ['firstName', 'lastName']);
            res.send(favorites);
        } catch (err) {
            res.send(err);
        }
    }

    public async getSingle(req: Request, res: Response): Promise<void> {
        const {productID, userID} = req.params;

        try {
            const favorite = await ProductFavorite.find({_id: productID, user: userID});
            res.send(favorite);
        } catch (err) {
            res.send(err);
        }
    }

    public async getByUser(req: Request, res: Response): Promise<void> {
        const {userID} = req.params;

        try {
            const favorite = await ProductFavorite.find({user: userID}).populate('user', ['firstName', 'lastName']);
            res.send(favorite);
        } catch (err) {
            res.send(err);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const favorite = await ProductFavorite.findByIdAndUpdate(id, req.body, {new: true});
            res.send(favorite);
        } catch (err) {
            res.send(err);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        console.log(id);

        try {
            await ProductFavorite.findByIdAndDelete(id);
            res.json({message: "Successful!"});
        } catch (err) {
            res.send(err);
        }
    }

    routes() {
        this.router.post('/', this.create);
        this.router.get('/:productID/:userID', this.getSingle);
        this.router.get('/all/:productID', this.getAll);
        this.router.get('/user/:userID', this.getByUser);
        this.router.put('/:productID', this.update);
        this.router.delete('/:id', this.delete);
    }
}

const productFavoriteRoutes = new ProductFavoriteRoutes();
export default productFavoriteRoutes.router;
