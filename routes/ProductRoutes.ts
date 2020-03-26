import {Router, Request, Response} from 'express';
import multer from "multer";
import dateformat from 'dateformat';
import Product from "../models/Product";
import ProductPicture from "../models/ProductPicture";
import StoreLogo from "../models/StoreLogo";
import path from "path";
import fs from "fs";

class ProductRoutes {
    router: Router;
    productPictureStorage: any;
    productPictureUpload: any;

    constructor() {
        this.router = Router();


        this.productPictureStorage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/productPicture')
            },
            filename: function (req, file, cb) {
                cb(null, dateformat(new Date(), "dd-mm-yyyy-hh-MM-ss") + '-' + file.fieldname + '-' + file.originalname);
            }
        });

        this.productPictureUpload = multer({storage: this.productPictureStorage});

        this.routes();
    }

    public async create(req: Request, res: Response): Promise<void> {
        const product = new Product(req.body);
        const files = req.files;

        try {
            const savedProduct = await product.save();

            // @ts-ignore
            await files.map(file => {
                const productPicture = new ProductPicture({
                    name: file.filename,
                    product: savedProduct,
                });

                productPicture.save();
            });

            res.send(savedProduct);
        } catch (err) {
            res.send(err);
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        const products = await Product.find().populate('store').populate('category');
        res.send(products);
    }

    public async getSingle(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        await Product.findById(id)
            .populate('store')
            .populate('category')
            .exec(function (err, product) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(product.store);
                    res.send(product);
                }
            });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const files = req.files;

        try {
            const product = await Product.findByIdAndUpdate({id}, req.body);

            // @ts-ignore
            await files.map(file => {
                const productPicture = new ProductPicture({
                    name: file.filename,
                    product: product,
                });

                productPicture.save();
            });

            res.send(product);
        } catch (err){

        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            await Product.findByIdAndDelete(id, function (err) {
                if (err){
                    res.send(err);
                } else {
                    ProductPicture.findOne({product: id}, async function (err, picture){
                        if (!err){
                            const picturePath = path.join(__dirname, '../uploads', 'productPicture', picture.name);
                            await picture.deleteOne();
                            await fs.unlinkSync(picturePath);
                        }
                    });
                }
            });

            res.json({message: "Successfully!"});
        } catch (err) {
            res.send(err);
        }
    }

    routes() {
        this.router.post('/', this.productPictureUpload.array('productImage', 5), this.create);
        this.router.get('/:id', this.getSingle);
        this.router.get('/', this.getAll);
        this.router.put('/:id', this.productPictureUpload.array('productImage', 5), this.update);
        this.router.delete('/:id', this.delete);
    }
}

const productRoutes = new ProductRoutes();
export default productRoutes.router;
