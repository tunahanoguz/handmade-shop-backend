import {Request, Response, Router} from 'express';
import Order from "../models/Order";

class OrderRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async create(req: Request, res: Response): Promise<void> {
        const order = new Order(req.body);

        try {
            await order.save();
            res.send(order);
        } catch (err) {
            res.send(err);
        }
    }

    public async getAllProductOrders(req: Request, res: Response): Promise<void> {
        const {productID} = req.params;

        try {
            const order = await Order.find({product: productID});
            res.send(order);
        } catch (err) {
            res.send(err);
        }
    }

    public async getAllUserOrders(req: Request, res: Response): Promise<void> {
        const {userID} = req.params;

        try {
            const order = await Order.find({user: userID});
            res.send(order);
        } catch (err) {
            res.send(err);
        }
    }

    public async getSingle(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const order = await Order.findById(id);
            res.send(order);
        } catch (err) {
            res.send(err);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const order = await Order.findByIdAndUpdate(id, req.body, {new: true});
            res.send(order);
        } catch (err) {
            res.send(err);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            await Order.findByIdAndDelete(id);
            res.json({message: "Successful!"});
        } catch (err) {
            res.send(err);
        }
    }

    routes() {
        this.router.post('/', this.create);
        this.router.get('/:id', this.getSingle);
        this.router.get('/product/:productID', this.getAllProductOrders);
        this.router.get('/user/:userID', this.getAllUserOrders);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}

const orderRoutes = new OrderRoutes();
export default orderRoutes.router;
