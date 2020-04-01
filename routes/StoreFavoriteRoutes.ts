import {Router, Request, Response} from 'express';
import StoreFavorite from "../models/StoreFavorite";

class StoreFavoriteRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async create(req: Request, res: Response): Promise<void> {
        const favorite = new StoreFavorite(req.body);

        try {
            const savedFavorite = await favorite.save();
            res.send(savedFavorite);
        } catch (err) {
            res.send(err);
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        const {storeID} = req.params;

        try {
            const favorites = await StoreFavorite.find({store: storeID}).populate('user', ['firstName', 'lastName']);
            res.send(favorites);
        } catch (err) {
            res.send(err);
        }
    }

    public async getSingle(req: Request, res: Response): Promise<void> {
        const {storeID} = req.params;

        try {
            const favorite = await StoreFavorite.findById(storeID).populate('user', ['firstName', 'lastName']);
            res.send(favorite);
        } catch (err) {
            res.send(err);
        }
    }

    public async getByUser(req: Request, res: Response): Promise<void> {
        const {userID} = req.params;

        try {
            const favorites = await StoreFavorite.find({user: userID}).populate('user', ['firstName', 'lastName']);
            res.send(favorites);
        } catch (err) {
            res.send(err);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const favorite = await StoreFavorite.findByIdAndUpdate(id, req.body, {new: true});
            res.send(favorite);
        } catch (err) {
            res.send(err);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            await StoreFavorite.findByIdAndDelete(id);
            res.json({message: "Successful!"});
        } catch (err) {
            res.send(err);
        }
    }

    routes() {
        this.router.post('/', this.create);
        this.router.get('/:storeID', this.getSingle);
        this.router.get('/all/:storeID', this.getAll);
        this.router.put('/:id', this.update);
        this.router.put('/user/:userID', this.getByUser);
        this.router.delete('/:id', this.delete);
    }
}

const storeFavoriteRoutes = new StoreFavoriteRoutes();
export default storeFavoriteRoutes.router;
