import {Router, Request, Response} from 'express';
import ProductScore from "../models/ProductScore";

class ProductScoreRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async create(req: Request, res: Response): Promise<void> {
        const score = new ProductScore(req.body);

        try {
            const savedScore = await score.save();
            res.send(savedScore);
        } catch (err) {
            res.send(err);
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        const {productID} = req.params;

        try {
            const scores = await ProductScore.find({product: productID});
            res.send(scores);
        } catch (err) {
            res.send(err);
        }
    }

    public async getSingle(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const score = await ProductScore.findById(id);
            res.send(score);
        } catch (err) {
            res.send(err);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const score = await ProductScore.findByIdAndUpdate(id, req.body, {new: true});
            res.send(score);
        } catch (err) {
            res.send(err);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            await ProductScore.findByIdAndDelete(id);
            res.json({message: "Successful!"});
        } catch (err) {
            res.send(err);
        }
    }

    routes() {
        this.router.post('/', this.create);
        this.router.get('/:id', this.getSingle);
        this.router.get('/all/:productID', this.getAll);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}

const productScoreRoutes = new ProductScoreRoutes();
export default productScoreRoutes.router;
