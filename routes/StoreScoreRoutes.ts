import {Request, Response, Router} from 'express';
import StoreScore from "../models/StoreScore";

class StoreScoreRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async create(req: Request, res: Response): Promise<void> {
        const storeScore = new StoreScore(req.body);

        try {
            await storeScore.save();
            res.send(storeScore);
        } catch (err) {
            res.send(err);
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        const {storeID} = req.params;

        try {
            const storeScores = await StoreScore.find({store: storeID});
            res.send(storeScores);
        } catch (err) {
            res.send(err);
        }
    }

    public async getSingle(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const storeScore = await StoreScore.findById(id);
            res.send(storeScore);
        } catch (err) {
            res.send(err);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const storeScore = await StoreScore.findByIdAndUpdate(id, req.body, {new: true});
            res.send(storeScore);
        } catch (err) {
            res.send(err);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            await StoreScore.findByIdAndDelete(id);
            res.json({message: "Successful!"});
        } catch (err) {
            res.send(err);
        }
    }

    routes() {
        this.router.post('/', this.create);
        this.router.get('/:id', this.getSingle);
        this.router.get('/all/:storeID', this.getAll);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}

const storeScoreRoutes = new StoreScoreRoutes();
export default storeScoreRoutes.router;
