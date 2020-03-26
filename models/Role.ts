import {Schema, model} from 'mongoose';

const RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

const Role = model('Role', RoleSchema);

export default Role;
