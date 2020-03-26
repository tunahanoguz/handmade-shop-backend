import {Router, Request, Response} from 'express';
import multer from "multer";
import fs from 'fs';
import path from 'path';
import dateformat from 'dateformat';
import Store from "../models/Store";
import StoreLogo from "../models/StoreLogo";
import StoreCoverPicture from "../models/StoreCoverPicture";

class StoreRoutes {
    router: Router;
    logoStorage: any;
    coverPictureStorage: any;
    logoUpload: any;
    coverPictureUpload: any;

    constructor() {
        this.router = Router();

        this.logoStorage = multer.diskStorage({
            destination: function(req, file, cb){
                const fieldName = file.fieldname;
                const path = `./uploads/${fieldName}`;
                cb(null, path);
            },
            filename: function(req, file, cb){
                cb(null, dateformat(new Date(), "dd-mm-yyyy-hh-MM-ss") + '-' + file.fieldname + '-' + file.originalname);
            }
        });

        this.coverPictureStorage = multer.diskStorage({
            destination: function(req, file, cb){
                cb(null, './uploads/coverPicture');
            },
            filename: function(req, file, cb){
                cb(null, dateformat(new Date(), "dd-mm-yyyy-hh-MM-ss") + '-' + file.originalname);
            }
        });

        this.logoUpload = multer({storage: this.logoStorage});
        this.coverPictureUpload = multer({storage: this.coverPictureStorage});

        this.routes();
    }

    public async create(req: Request, res: Response): Promise<void> {
        const store = new Store(req.body);
        const files = req.files;

        try {
            const savedStore = await store.save();
            res.json(savedStore);

            const storeLogoName = files['storeLogo'][0]['filename'];
            const storeCoverPictureName = files['storeCoverPicture'][0]['filename'];

            if (storeLogoName){
                const storeLogo = new StoreLogo({
                    name: storeLogoName,
                    store: savedStore
                });

                await storeLogo.save();
            }

            if (storeCoverPictureName){
                const storeCoverPicture = new StoreCoverPicture({
                    name: storeCoverPictureName,
                    store: savedStore
                });

                await storeCoverPicture.save();
            }
        } catch (err) {
            res.send(err);
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const stores = await Store.find();
            res.json(stores);
        } catch (err) {
            res.send(err);
        }
    }

    public async getSingle(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const store = await Store.findById(id);
            res.json(store);
        } catch (err) {
            res.send(err);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const files = req.files;

        try {
            const store = await Store.findByIdAndUpdate(id, req.body);

            const storeLogoName = files['storeLogo'][0]['filename'];
            const storeCoverPictureName = files['storeCoverPicture'][0]['filename'];

            if (storeLogoName){
                await StoreLogo.findOneAndUpdate({store}, {name: storeLogoName});
            }

            if (storeCoverPictureName){
                await StoreCoverPicture.findOneAndUpdate({store}, {name: storeCoverPictureName});
            }

            res.json(store);
        } catch (err) {
            res.send(err);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            await Store.findByIdAndDelete(id, async function (err) {
                if (!err){
                    StoreLogo.findOne({store: id}, async function (err, logo){
                        if (!err){
                            const logoPath = path.join(__dirname, '../uploads', 'storeLogo', logo.name);
                            await logo.deleteOne();
                            await fs.unlinkSync(logoPath);
                        }
                    });

                    StoreCoverPicture.findOne({store: id}, async function (err, coverPicture){
                        if (!err){
                            const coverPicturePath = path.join(__dirname, '../uploads', 'storeCoverPicture', coverPicture.name);
                            await coverPicture.deleteOne();
                            await fs.unlinkSync(coverPicturePath);
                        }
                    });
                }
            });
            res.json({message: "Successfully!"});
        } catch (err) {
            res.send(err);
        }
    }

    routes(){
        this.router.post('/', this.logoUpload.fields([{name: 'storeLogo', maxCount: 1}, {name: 'storeCoverPicture', maxCount: 1}]), this.create);
        this.router.get('/:id', this.getSingle);
        this.router.get('/', this.getAll);
        this.router.put('/:id', this.logoUpload.fields([{name: 'storeLogo', maxCount: 1}, {name: 'storeCoverPicture', maxCount: 1}]), this.update);
        this.router.delete('/:id', this.delete);
    }
}

const storeRoutes = new StoreRoutes();
export default storeRoutes.router;
