import {Router, Request, Response} from 'express';
import Role from '../models/Role';

class RoleRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async create(req: Request, res: Response): Promise<void> {
        const role = new Role(req.body);
        await role.save();
        res.json(role);
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        const roles = await Role.find();
        res.json(roles);
    }

    public async getSingle(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const role = await Role.findById(id);
        res.json(role);
    }

    public async update(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const role = await Role.findByIdAndUpdate(id, req.body, {new: true});
            res.json(role);
        } catch (err) {
            res.json(err);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        await Role.findByIdAndDelete(id);
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

const roleRoutes = new RoleRoutes();
export default roleRoutes.router;
