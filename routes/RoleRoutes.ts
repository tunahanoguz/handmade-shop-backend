import {Router, Request, Response} from 'express';
import Role from '../models/Role';

class RoleRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const role = new Role(req.body);
            await role.save();
            res.send(role);
        } catch (err) {
            res.send(err);
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const roles = await Role.find();
            res.send(roles);
        } catch (err) {
            res.send(err);
        }
    }

    public async getSingle(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const role = await Role.findById(id);
            res.json(role);
        } catch (err) {
            res.send(err);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const role = await Role.findByIdAndUpdate(id, req.body, {new: true});
            res.send(role);
        } catch (err) {
            res.send(err);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            await Role.findByIdAndDelete(id);
            res.send({message: "Successfully!"});
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

const roleRoutes = new RoleRoutes();
export default roleRoutes.router;
