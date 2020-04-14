import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';

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

UserSchema.methods.generateHash = async function(password) {
    return await bcrypt.hash(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = model('User', UserSchema);

export default User;
