import {Router, Request, Response} from 'express';
import ProductComment from "../models/ProductComment";

class ProductCommentRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async create(req: Request, res: Response): Promise<void> {
        const comment = new ProductComment(req.body);

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
            const comments = await ProductComment.find({product: productID});
            res.send(comments);
        } catch (err) {
            res.send(err);
        }
    }

    public async getSingle(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const comment = await ProductComment.findById(id);
            res.send(comment);
        } catch (err) {
            res.send(err);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const foundComment = await ProductComment.findById(id);
            const commentBody = foundComment.body;
            const newCommentBody = commentBody + ' ' + req.body.body;
            const comment = await ProductComment.findByIdAndUpdate(id, {body: newCommentBody}, {new: true});
            res.send(comment);
        } catch (err) {
            res.send(err);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            await ProductComment.findByIdAndDelete(id);
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

const productCommentRoutes = new ProductCommentRoutes();
export default productCommentRoutes.router;
