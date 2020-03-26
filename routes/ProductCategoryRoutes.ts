import {Request, Response, Router} from 'express';
import ProductCategory from "../models/ProductCategory";

class ProductCategoryRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async create(req: Request, res: Response): Promise<void> {
        const productCategory = new ProductCategory(req.body);
        await productCategory.save();
        res.json(productCategory);
    }

    public async getAll(req: Request, res: Response): Promise<void>{
        const productCategories = await ProductCategory.find();
        res.json(productCategories);
    }

    public async getSingle(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const productCategory = await ProductCategory.findById(id);
        res.json(productCategory);
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const productCategory = await ProductCategory.findByIdAndUpdate({id}, req.body, {new: true});
        res.send(productCategory);
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        await ProductCategory.findByIdAndDelete(id);
        res.json({message: "Successfully!"});
    }

    routes(){
        this.router.post('/', this.create);
        this.router.get('/:id', this.getSingle);
        this.router.get('/', this.getAll);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}

const productCategoryRoutes = new ProductCategoryRoutes();
export default productCategoryRoutes.router;
