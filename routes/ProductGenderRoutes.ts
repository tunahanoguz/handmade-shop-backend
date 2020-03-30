import {Router, Request, Response} from 'express';
import ProductGender from "../models/ProductGender";

class ProductGenderRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async create(req: Request, res: Response): Promise<void> {
        const gender = new ProductGender(req.body);

        try {
            const savedGender = await gender.save();
            res.send(savedGender);
        } catch (err) {
            res.send(err);
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const genders = await ProductGender.find();
            res.send(genders);
        } catch (err) {
            res.send(err);
        }
    }

    public async getSingle(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const gender = await ProductGender.findById(id);
            res.send(gender);
        } catch (err) {
            res.send(err);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const gender = await ProductGender.findByIdAndUpdate(id, req.body, {new: true});
            res.send(gender);
        } catch (err) {
            res.send(err);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            await ProductGender.findByIdAndDelete(id);
            res.json({message: "Successful!"});
        } catch (err) {
            res.send(err);
        }
    }

    routes() {
        this.router.post('/', this.create);
        this.router.get('/:id', this.getSingle);
        this.router.get('/', this.getAll);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}

const productGenderRoutes = new ProductGenderRoutes();
export default productGenderRoutes.router;
