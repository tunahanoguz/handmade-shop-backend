import {Router, Request, Response} from 'express';
import UserCreditCard from "../models/UserCreditCard";

class UserCreditCardRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async create(req: Request, res: Response): Promise<void> {
        const creditCard = new UserCreditCard(req.body);

        try {
            const savedCreditCard = await creditCard.save();
            res.send(savedCreditCard);
        } catch (err){
            res.send(err);
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const creditCard = await UserCreditCard.find();
            res.send(creditCard);
        } catch (err){
            res.send(err);
        }
    }

    public async getSingle(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const creditCard = await UserCreditCard.findById(id);
            res.send(creditCard);
        } catch (err){
            res.send(err);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const creditCard = await UserCreditCard.findByIdAndUpdate(id, req.body);
            res.send(creditCard);
        } catch (err){
            res.send(err);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            await UserCreditCard.findByIdAndDelete(id);
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

const userCreditCardRoutes = new UserCreditCardRoutes();
export default userCreditCardRoutes.router;
