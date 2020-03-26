import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
    },
});

const User = model('User', UserSchema);

export default User;
