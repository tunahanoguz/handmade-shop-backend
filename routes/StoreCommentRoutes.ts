import {Router, Request, Response} from 'express';
import StoreComment from "../models/StoreComment";

class StoreCommentRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async create(req: Request, res: Response): Promise<void> {
        const comment = new StoreComment(req.body);

        try {
            const savedComment = await comment.save();
            res.send(savedComment);
        } catch (err) {
            res.send(err);
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        const {productID} = req.params;

        try {
            const comments = await StoreComment.find({product: productID});
            res.send(comments);
        } catch (err) {
            res.send(err);
        }
    }

    public async getSingle(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const comment = await StoreComment.findById(id);
            res.send(comment);
        } catch (err) {
            res.send(err);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const foundComment = await StoreComment.findById(id);
            const commentBody = foundComment.body;
            const newCommentBody = commentBody + ' ' + req.body.body;
            const comment = await StoreComment.findByIdAndUpdate(id, {body: newCommentBody}, {new: true});
            res.send(comment);
        } catch (err) {
            res.send(err);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            await StoreComment.findByIdAndDelete(id);
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

const storeCommentRoutes = new StoreCommentRoutes();
export default storeCommentRoutes.router;
