import {Request, Response, Router} from 'express';
import ProductType from "../models/ProductType";

class ProductTypeRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const productType = new ProductType(req.body);
            await productType.save();
            res.send(productType);
        } catch (err){
            res.send(err).status(400);
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const productTypes = await ProductType.find();
            res.send(productTypes);
        } catch (err) {
            res.send(err);
        }
    }

    public async getSingle(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const productType = await ProductType.findById(id);
            res.send(productType);
        } catch (err) {
            res.send(err);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const productType = await ProductType.findByIdAndUpdate({id}, req.body, {new: true});
            res.send(productType);
        } catch (err) {
            res.send(err);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            await ProductType.findByIdAndDelete(id);
            res.json({message: "Successfully!"});
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

const productTypeRoutes = new ProductTypeRoutes();
export default productTypeRoutes.router;
