import {Schema, model} from 'mongoose';

const UserAddressSchema = new Schema({
    address: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const UserAddress = model('UserAddress', UserAddressSchema);

export default UserAddress;
