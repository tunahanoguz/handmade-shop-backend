import {Router, Request, Response} from 'express';
import ProductPicture from "../models/ProductPicture";

class ProductPictureRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        const {productID} = req.params;
        try {
            const productPictures = await ProductPicture.find({product: productID});
            res.send(productPictures).status(200);
        } catch (err) {
            res.send(err).status(400);
        }
    }

    routes() {
        this.router.get('/:productID', this.getAll);
    }
}

const productPictureRoutes = new ProductPictureRoutes();
export default productPictureRoutes.router;
