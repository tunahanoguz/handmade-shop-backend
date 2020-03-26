import {Router, Request, Response} from 'express';
import UserAddress from "../models/UserAddress";

class UserAddressRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async create(req: Request, res: Response): Promise<void> {
        const address = new UserAddress(req.body);

        try {
            const savedAddress = await address.save();
            res.send(savedAddress);
        } catch (err){
            res.send(err);
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const address = await UserAddress.find();
            res.send(address);
        } catch (err){
            res.send(err);
        }
    }

    public async getSingle(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const address = await UserAddress.findById(id);
            res.send(address);
        } catch (err){
            res.send(err);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const address = await UserAddress.findByIdAndUpdate(id, req.body);
            res.send(address);
        } catch (err){
            res.send(err);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            await UserAddress.findByIdAndDelete(id);
            res.json({message: "Successful!"});
        } catch (err){
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

const userAddressRoutes = new UserAddressRoutes();
export default userAddressRoutes.router;
